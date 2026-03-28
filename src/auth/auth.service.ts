import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto, ResendCodeDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing && existing.isVerified) {
      throw new ConflictException('Email already registered');
    }

    // If unverified user exists, update their password and resend code
    const code = this.generateCode();
    const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    let user;
    if (existing && !existing.isVerified) {
      user = await this.prisma.user.update({
        where: { id: existing.id },
        data: { password: hashedPassword, verificationCode: code, codeExpiresAt },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          verificationCode: code,
          codeExpiresAt,
        },
      });
    }

    // Send verification email
    try {
      await this.emailService.sendVerificationCode(dto.email, code);
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }

    return {
      message: 'Verification code sent to your email',
      email: user.email,
      requiresVerification: true,
    };
  }

  async verify(dto: VerifyDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    if (user.verificationCode !== dto.code) {
      throw new BadRequestException('Invalid verification code');
    }

    if (user.codeExpiresAt && user.codeExpiresAt < new Date()) {
      throw new BadRequestException('Verification code expired. Please request a new one.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationCode: null, codeExpiresAt: null },
    });

    const token = this.generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email }, token };
  }

  async resendCode(dto: ResendCodeDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email already verified');
    }

    const code = this.generateCode();
    const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { verificationCode: code, codeExpiresAt },
    });

    try {
      await this.emailService.sendVerificationCode(dto.email, code);
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }

    return { message: 'New verification code sent to your email' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isVerified) {
      // Resend code automatically
      const code = this.generateCode();
      const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verificationCode: code, codeExpiresAt },
      });
      try {
        await this.emailService.sendVerificationCode(dto.email, code);
      } catch (err) {
        console.error('Failed to send verification email:', err);
      }

      return {
        message: 'Email not verified. Verification code sent.',
        email: user.email,
        requiresVerification: true,
      };
    }

    const token = this.generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email }, token };
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }
}

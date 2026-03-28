import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyDto, ResendCodeDto } from './dto/verify.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    private generateCode;
    register(dto: RegisterDto): Promise<{
        message: string;
        email: string;
        requiresVerification: boolean;
    }>;
    verify(dto: VerifyDto): Promise<{
        user: {
            id: string;
            email: string;
        };
        token: string;
    }>;
    resendCode(dto: ResendCodeDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        email: string;
        requiresVerification: boolean;
        user?: undefined;
        token?: undefined;
    } | {
        user: {
            id: string;
            email: string;
        };
        token: string;
        message?: undefined;
        email?: undefined;
        requiresVerification?: undefined;
    }>;
    private generateToken;
}

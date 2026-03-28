"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("./email.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    emailService;
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing && existing.isVerified) {
            throw new common_1.ConflictException('Email already registered');
        }
        const code = this.generateCode();
        const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        let user;
        if (existing && !existing.isVerified) {
            user = await this.prisma.user.update({
                where: { id: existing.id },
                data: { password: hashedPassword, verificationCode: code, codeExpiresAt },
            });
        }
        else {
            user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    verificationCode: code,
                    codeExpiresAt,
                },
            });
        }
        try {
            await this.emailService.sendVerificationCode(dto.email, code);
        }
        catch (err) {
            console.error('Failed to send verification email:', err);
        }
        return {
            message: 'Verification code sent to your email',
            email: user.email,
            requiresVerification: true,
        };
    }
    async verify(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email already verified');
        }
        if (user.verificationCode !== dto.code) {
            throw new common_1.BadRequestException('Invalid verification code');
        }
        if (user.codeExpiresAt && user.codeExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Verification code expired. Please request a new one.');
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true, verificationCode: null, codeExpiresAt: null },
        });
        const token = this.generateToken(user.id, user.email);
        return { user: { id: user.id, email: user.email }, token };
    }
    async resendCode(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('Email already verified');
        }
        const code = this.generateCode();
        const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { verificationCode: code, codeExpiresAt },
        });
        try {
            await this.emailService.sendVerificationCode(dto.email, code);
        }
        catch (err) {
            console.error('Failed to send verification email:', err);
        }
        return { message: 'New verification code sent to your email' };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(dto.password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isVerified) {
            const code = this.generateCode();
            const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { verificationCode: code, codeExpiresAt },
            });
            try {
                await this.emailService.sendVerificationCode(dto.email, code);
            }
            catch (err) {
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
    generateToken(userId, email) {
        return this.jwtService.sign({ sub: userId, email });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
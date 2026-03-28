import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        isVerified: boolean;
        verificationCode: string | null;
        codeExpiresAt: Date | null;
    } | null>;
}

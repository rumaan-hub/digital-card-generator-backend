import type { Response } from 'express';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardController {
    private cardService;
    constructor(cardService: CardService);
    create(dto: CreateCardDto): Promise<{
        socialLinks: {
            url: string;
            id: string;
            platform: string;
        }[];
        customButtons: {
            url: string;
            id: string;
            label: string;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        userId: string | null;
        slug: string;
        name: string;
        profileImage: string;
        coverImage: string;
        jobTitle: string;
        company: string;
        bio: string;
        phone: string;
        whatsapp: string;
        website: string;
        address: string;
        theme: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        socialLinks: {
            url: string;
            id: string;
            platform: string;
        }[];
        customButtons: {
            url: string;
            id: string;
            label: string;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        userId: string | null;
        slug: string;
        name: string;
        profileImage: string;
        coverImage: string;
        jobTitle: string;
        company: string;
        bio: string;
        phone: string;
        whatsapp: string;
        website: string;
        address: string;
        theme: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    })[]>;
    findBySlug(slug: string): Promise<{
        socialLinks: {
            url: string;
            id: string;
            platform: string;
        }[];
        customButtons: {
            url: string;
            id: string;
            label: string;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        userId: string | null;
        slug: string;
        name: string;
        profileImage: string;
        coverImage: string;
        jobTitle: string;
        company: string;
        bio: string;
        phone: string;
        whatsapp: string;
        website: string;
        address: string;
        theme: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    getVCard(slug: string, res: Response): Promise<void>;
    update(id: string, dto: UpdateCardDto): Promise<{
        socialLinks: {
            url: string;
            id: string;
            platform: string;
        }[];
        customButtons: {
            url: string;
            id: string;
            label: string;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        userId: string | null;
        slug: string;
        name: string;
        profileImage: string;
        coverImage: string;
        jobTitle: string;
        company: string;
        bio: string;
        phone: string;
        whatsapp: string;
        website: string;
        address: string;
        theme: import("@prisma/client/runtime/client").JsonValue;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}

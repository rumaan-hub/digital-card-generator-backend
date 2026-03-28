"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CardService = class CardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }
    async ensureUniqueSlug(baseSlug) {
        let slug = baseSlug;
        let counter = 1;
        while (await this.prisma.card.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        return slug;
    }
    cardInclude = {
        socialLinks: { select: { id: true, platform: true, url: true } },
        customButtons: { select: { id: true, label: true, url: true } },
    };
    async create(dto) {
        const baseSlug = this.generateSlug(dto.name || 'card');
        const slug = await this.ensureUniqueSlug(baseSlug);
        const { socialLinks, customButtons, ...cardData } = dto;
        return this.prisma.card.create({
            data: {
                ...cardData,
                slug,
                theme: dto.theme || {},
                socialLinks: socialLinks?.length ? { create: socialLinks } : undefined,
                customButtons: customButtons?.length ? { create: customButtons } : undefined,
            },
            include: this.cardInclude,
        });
    }
    async findAll() {
        return this.prisma.card.findMany({
            include: this.cardInclude,
            orderBy: { updatedAt: 'desc' },
        });
    }
    async findBySlug(slug) {
        const card = await this.prisma.card.findUnique({
            where: { slug },
            include: this.cardInclude,
        });
        if (!card)
            throw new common_1.NotFoundException('Card not found');
        return card;
    }
    async update(id, dto) {
        const card = await this.prisma.card.findUnique({ where: { id } });
        if (!card)
            throw new common_1.NotFoundException('Card not found');
        if (dto.slug && dto.slug !== card.slug) {
            const existing = await this.prisma.card.findUnique({ where: { slug: dto.slug } });
            if (existing) {
                dto.slug = await this.ensureUniqueSlug(dto.slug);
            }
        }
        const { socialLinks, customButtons, ...cardData } = dto;
        if (socialLinks !== undefined) {
            await this.prisma.socialLink.deleteMany({ where: { cardId: id } });
        }
        if (customButtons !== undefined) {
            await this.prisma.customButton.deleteMany({ where: { cardId: id } });
        }
        return this.prisma.card.update({
            where: { id },
            data: {
                ...cardData,
                theme: dto.theme !== undefined ? dto.theme : undefined,
                socialLinks: socialLinks !== undefined ? { create: socialLinks } : undefined,
                customButtons: customButtons !== undefined ? { create: customButtons } : undefined,
            },
            include: this.cardInclude,
        });
    }
    async delete(id) {
        const card = await this.prisma.card.findUnique({ where: { id } });
        if (!card)
            throw new common_1.NotFoundException('Card not found');
        await this.prisma.card.delete({ where: { id } });
        return { message: 'Card deleted successfully' };
    }
    generateVCard(card) {
        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${card.name || ''}`,
            `TITLE:${card.jobTitle || ''}`,
            `ORG:${card.company || ''}`,
            `TEL;TYPE=CELL:${card.phone || ''}`,
            `EMAIL:${card.email || ''}`,
            `ADR;TYPE=WORK:;;${card.address || ''}`,
            `URL:${card.website || ''}`,
        ];
        if (card.bio)
            lines.push(`NOTE:${card.bio}`);
        lines.push('END:VCARD');
        return lines.join('\r\n');
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CardService);
//# sourceMappingURL=card.service.js.map
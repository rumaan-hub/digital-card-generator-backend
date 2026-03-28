import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private async ensureUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;
    while (await this.prisma.card.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    return slug;
  }

  private cardInclude = {
    socialLinks: { select: { id: true, platform: true, url: true } },
    customButtons: { select: { id: true, label: true, url: true } },
  };

  async create(dto: CreateCardDto) {
    const baseSlug = this.generateSlug(dto.name || 'card');
    const slug = await this.ensureUniqueSlug(baseSlug);
    const { socialLinks, customButtons, ...cardData } = dto;

    return this.prisma.card.create({
      data: {
        ...cardData,
        slug,
        theme: (dto.theme as any) || {},
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

  async findBySlug(slug: string) {
    const card = await this.prisma.card.findUnique({
      where: { slug },
      include: this.cardInclude,
    });
    if (!card) throw new NotFoundException('Card not found');
    return card;
  }

  async update(id: string, dto: UpdateCardDto) {
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');

    // If slug is being changed, check uniqueness
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
        theme: dto.theme !== undefined ? (dto.theme as any) : undefined,
        socialLinks: socialLinks !== undefined ? { create: socialLinks } : undefined,
        customButtons: customButtons !== undefined ? { create: customButtons } : undefined,
      },
      include: this.cardInclude,
    });
  }

  async delete(id: string) {
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');
    await this.prisma.card.delete({ where: { id } });
    return { message: 'Card deleted successfully' };
  }

  generateVCard(card: any): string {
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
    if (card.bio) lines.push(`NOTE:${card.bio}`);
    lines.push('END:VCARD');
    return lines.join('\r\n');
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.cardService.create(dto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.cardService.findBySlug(slug);
  }

  @Get(':slug/vcard')
  async getVCard(@Param('slug') slug: string, @Res() res: Response) {
    const card = await this.cardService.findBySlug(slug);
    const vcf = this.cardService.generateVCard(card);

    res.set({
      'Content-Type': 'text/vcard',
      'Content-Disposition': `attachment; filename="${card.slug}.vcf"`,
    });
    res.send(vcf);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.cardService.delete(id);
  }
}

import { Response } from 'express';
import { CreateProductDefinitionDTO } from '../service/baseprod.dto';
import { BaseProductService } from '../service/baseproduct.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

@Controller('catalog')
export class CatalogController {
  constructor(private baseProductService: BaseProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDefinitionDTO) {
    await this.baseProductService.create(dto);
    return;
  }

  @Get()
  async getAll() {
    const out = await this.baseProductService.getAll();
    return {
      results: out,
    };
  }

  @Delete(':id')
  async deleteBaseProduct(@Param('id') id: string) {
    await this.baseProductService.delete(id);
    return;
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const serviceResult = await this.baseProductService.findById(id);
    if (!serviceResult) return res.status(HttpStatus.NOT_FOUND).end();
    return res.json(serviceResult).end();
  }
}

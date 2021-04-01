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
  Query,
  Res,
} from '@nestjs/common';
import { GuisoService } from '../service/guiso.service';
import { CreateGuisoDTO } from '../service/guiso.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private baseProductService: BaseProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDefinitionDTO) {
    try {
      await this.baseProductService.create(dto);
      return;
    } catch (err) {
      throw err;
    }
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

@Controller('guisos')
export class GuisoController {
  constructor(private guisoService: GuisoService) {}

  @Post()
  async createGuiso(@Body() dto: CreateGuisoDTO, @Res() res: Response) {
    try {
      await this.guisoService.create(dto);
      return res.status(HttpStatus.OK).end();
    } catch (err) {
      console.error(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }

  @Get()
  async getAll(@Query() query, @Res() res: Response) {
    try {
      const serviceRes = await this.guisoService.getAll(query['page']);
      return res.status(HttpStatus.OK).json({ results: serviceRes }).end();
    } catch (err) {
      console.error(err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
}

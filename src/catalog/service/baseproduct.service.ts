import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { v4 } from 'uuid';
import { IBaseProduct } from '../interfaces/baseprod';
import { IProductPublicDTO } from '../interfaces/product.dto';
import { BaseProdRepo } from '../repo/BaseProduct.repo';
import { GuisoRepo } from '../repo/guiso.repo';
import { CreateProductDefinitionDTO } from './baseprod.dto';

@Injectable()
export class BaseProductService {
  constructor(private prodRepo: BaseProdRepo, private guisoRepo: GuisoRepo) {}

  async create(bp: CreateProductDefinitionDTO): Promise<void> {
    const existArray = await this.guisoRepo.existBulk(bp.guisos);
    const allTrue = existArray.find((e) => e == false);
    if (allTrue == false)
      throw new HttpException(
        { errors: ['Guiso does not exist'] },
        HttpStatus.BAD_REQUEST,
      );

    if (bp.maxGuisos > bp.guisos.length || bp.minGuisos > bp.maxGuisos)
      throw new HttpException(
        { errors: ['Invalid max/min guiso amount'] },
        HttpStatus.CONFLICT,
      );

    // TODO: implement the product class
    const prodInstance: IBaseProduct = {
      ...bp,
      _id: v4(),
      createdAt: moment().format(),
      description: bp.description || '',
    };

    await this.prodRepo.save(prodInstance);
  }

  async delete(id: string): Promise<void> {
    await this.prodRepo.delete(id);
    return;
  }

  async getAll(): Promise<IProductPublicDTO[]> {
    return await this.prodRepo.getAllToDTO();
  }

  async findById(id: string): Promise<IProductPublicDTO | null> {
    const output = await this.prodRepo.findByIdToDTO(id);
    return output;
  }
}

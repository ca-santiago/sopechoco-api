import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { v4 } from 'uuid';
import { IBaseProduct } from '../interfaces/baseprod';
import { BaseProdRepo } from '../repo/BaseProduct.repo';
import { CreateProductDefinitionDTO } from './baseprod.dto';

@Injectable()
export class BaseProductService {
  constructor(private prodRepo: BaseProdRepo) {}

  async create(bp: CreateProductDefinitionDTO): Promise<void> {
    const prodInstance: IBaseProduct = {
      ...bp,
      id: v4(),
      createdAt: moment().format(),
      description: bp.description || '',
    };

    await this.prodRepo.save(prodInstance);
  }

  async delete(id: string): Promise<void> {
    await this.prodRepo.delete(id);
    return;
  }

  async getAll(): Promise<IBaseProduct[]> {
    return await this.prodRepo.getAll();
  }

  async findById(id: string): Promise<IBaseProduct> {
    const output = await this.prodRepo.findById(id);
    return output;
  }
}

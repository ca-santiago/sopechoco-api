import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBaseProduct } from '../interfaces/baseprod';
import { IProductPublicDTO } from '../interfaces/product.dto';
import { ProductMapper } from '../mapper/product.mapper';
import { BaseProdDocument } from '../schema/baseprod.schema';

@Injectable()
export class BaseProdRepo {
  constructor(
    @InjectModel('BaseProduct') private prodModel: Model<BaseProdDocument>,
    private prodMapper: ProductMapper,
  ) {}

  async save(bp: IBaseProduct): Promise<void> {
    const upsetData = {
      ...bp,
    };
    await this.prodModel
      .findByIdAndUpdate(bp._id, upsetData, { upsert: true })
      .exec();
  }

  async delete(_id: string): Promise<void> {
    await this.prodModel.deleteOne({ _id }).exec();
    return;
  }

  async findById(id: string): Promise<IBaseProduct | null> {
    const exist = await this.prodModel.findById(id).exec();
    if (exist) return this.prodMapper.toDomain(exist);
    return null;
  }

  async exist(_id: string): Promise<boolean> {
    return !(await this.prodModel.exists({ _id }));
  }

  async getAll(): Promise<any> {
    const results = await this.prodModel.find().exec();
    return results.map((item) => this.prodMapper.toDomain(item));
  }

  // Query version

  async getAllToDTO(): Promise<IProductPublicDTO[]> {
    const results = await this.prodModel.find().exec();
    return results.map((item) => this.prodMapper.toDTO(item));
  }

  async findByIdToDTO(id: string): Promise<IProductPublicDTO | null> {
    const exist = await this.prodModel.findById(id).exec();
    if (exist) return this.prodMapper.toDTO(exist);
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBaseProduct } from '../interfaces/baseprod';
import { BaseProdDocument } from '../schema/baseprod.schema';

@Injectable()
export class BaseProdRepo {
  constructor(
    @InjectModel('BaseProduct') private prodModel: Model<BaseProdDocument>,
  ) {}

  async save(bp: IBaseProduct): Promise<void> {
    const upsetData = {
      ...bp,
    };
    await this.prodModel
      .findByIdAndUpdate(bp.id, upsetData, { upsert: true })
      .exec();
  }

  async delete(_id: string): Promise<void> {
    await this.prodModel.deleteOne({ _id }).exec();
    return;
  }

  async findById(id: string): Promise<IBaseProduct | null> {
    return await this.prodModel.findById(id).exec();
  }

  async exist(_id: string): Promise<boolean> {
    return !(await this.prodModel.exists({ _id }));
  }

  async getAll(): Promise<any> {
    return this.prodModel.find().exec();
  }
}

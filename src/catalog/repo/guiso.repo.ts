import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGuiso } from '../interfaces/guiso';
import { GuisoDocument } from '../schema/guiso.schema';

@Injectable()
export class GuisoRepo {
  constructor(@InjectModel('Guiso') private guisoModel: Model<GuisoDocument>) { }
  async save(g: IGuiso): Promise<void> {
    const upsetData = { ...g };
    await this.guisoModel
      .findByIdAndUpdate(g.id, upsetData, { upsert: true })
      .exec();
    return;
  }

  async findById(id: string): Promise<IGuiso | null> {
    const res = await this.guisoModel.findById(id).exec();
    return res;
  }

  async getAll(offset: number): Promise<IGuiso[]> {
    return await this.guisoModel
      .find()
      .skip(10 * offset)
      .limit(10)
      .sort('createdAt')
      .exec();
  }

  async exist(_id: string): Promise<boolean> {
    return await this.guisoModel.exists({ _id });
  }

  async existBulk(ids: string[]): Promise<boolean[]> {
    const existResultMapped = ids.map((i) => this.exist(i));
    return await Promise.all(existResultMapped);
  }
}

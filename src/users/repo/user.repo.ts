import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../domain/user';
import { IUserPublicDTO } from '../interfaces/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UserDocument } from '../schema/user';

@Injectable()
export class UserMongoRepo {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private userMapper: UserMapper,
  ) {}

  async exist(_id: string): Promise<boolean> {
    return await this.userModel.exists({ _id });
  }

  async findByEmail(e: string): Promise<User | null> {
    const exist = await this.userModel.findOne({ email: e });
    if (exist) return this.userMapper.toDomain(exist);
    return null;
  }

  async save(acc: User): Promise<void> {
    const mapped = this.userMapper.toRepo(acc);
    await this.userModel
      .findByIdAndUpdate(acc.id, mapped, { upsert: true })
      .exec();
    return;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
    return;
  }

  // Query methods

  async findToDTO(offset: number): Promise<IUserPublicDTO[]> {
    const results = await this.userModel
      .find()
      .skip(10 * offset)
      .limit(10)
      .sort('createdAt')
      .exec();
    const mapped = results.map((item) =>
      this.userMapper.fromRepoToPublicDTO(item),
    );
    return mapped;
  }

  async findByEmailToDTO(e: string): Promise<IUserPublicDTO | null> {
    const exist = await this.userModel.findOne({ email: e });
    if (exist) return this.userMapper.fromRepoToPublicDTO(exist);
    return null;
  }
}

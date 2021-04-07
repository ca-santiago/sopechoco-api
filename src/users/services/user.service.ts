import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { CreateUserAccountDTO } from './dto';
import * as moment from 'moment';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { UserMongoRepo } from '../repo/user.repo';
import { IUserPublicDTO } from '../interfaces/user.dto';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UserMongoRepo,
    private userMapper: UserMapper,
  ) {}

  async createAccount(dto: CreateUserAccountDTO): Promise<any> {
    const { email, password, name } = dto;

    const alreadyExist = await this.userRepo.findByEmail(email);
    if (alreadyExist) throw new ConflictException('Email already registered');

    const hashedPassword = bcrypt.hashSync(password);
    const accInstance = new User(
      v4(),
      email,
      name,
      hashedPassword,
      moment().format(),
    );
    await this.userRepo.save(accInstance);
    return;
  }

  async findByEmail(email: string): Promise<IUserPublicDTO | null> {
    return await this.userRepo.findByEmailToDTO(email);
  }

  async getAllUsers(page = 0): Promise<{ results: IUserPublicDTO[] }> {
    const results = await this.userRepo.findToDTO(page > 1 ? page - 1 : 0);
    return {
      results: results,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserPublicDTO | null> {
    const userOrNull = await this.userRepo.findByEmail(email);
    if (!userOrNull) return null;

    const equals = bcrypt.compareSync(password, userOrNull.password);

    if (!equals) return null;
    return this.userMapper.toPublicDTO(userOrNull);
  }

  async deleteAccount(id: string): Promise<void> {
    // TODO use the id from authenticated account
    await this.userRepo.delete(id);
    return;
  }
}

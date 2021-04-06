import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { CreateUserAccountDTO } from './dto';
import * as moment from 'moment';
import { v4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { UserMongoRepo } from '../repo/user.repo';
import { IUserPublicDTO } from '../interfaces/user.dto';

@Injectable()
export class UsersService {
  constructor(private accRepo: UserMongoRepo) {}

  async createAccount(dto: CreateUserAccountDTO): Promise<any> {
    const { email, password, name } = dto;

    const alreadyExist = await this.accRepo.findByEmail(email);
    if (alreadyExist) throw new ConflictException('Email already registered');

    const hashedPassword = bcrypt.hashSync(password);
    const accInstance = new User(
      v4(),
      email,
      name,
      hashedPassword,
      moment().format(),
    );
    await this.accRepo.save(accInstance);
    return;
  }

  async findByEmail(email: string): Promise<IUserPublicDTO | null> {
    return await this.accRepo.findByEmail(email);
  }

  async getAllUsers(page = 0): Promise<{ results: IUserPublicDTO[] }> {
    const results = await this.accRepo.findToDTO(page > 1 ? page - 1 : 0);
    return {
      results: results,
    };
  }

  async deleteAccount(id: string): Promise<void> {
    // TODO use the id from authenticated account
    await this.accRepo.delete(id);
    return;
  }
}

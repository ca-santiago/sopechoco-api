import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { IUserPublicDTO } from '../interfaces/user.dto';
import { IUserRepo } from '../interfaces/user.repo';

@Injectable()
export class UserMapper {
  toRepo(domain: User): IUserRepo {
    const output: IUserRepo = {
      _id: domain.id,
      createdAt: domain.createdAt,
      email: domain.email,
      password: domain.password,
      name: domain.username,
    };
    return output;
  }

  toDomain(raw: IUserRepo): User {
    return new User(raw._id, raw.email, raw.name, raw.password, raw.createdAt);
  }

  toPublicDTO(u: User): IUserPublicDTO {
    const output: IUserPublicDTO = {
      createdAt: u.createdAt,
      email: u.email,
      id: u.id,
      name: u.username,
    };
    return output;
  }

  // Query version

  fromRepoToPublicDTO(raw: IUserRepo): IUserPublicDTO {
    const output: IUserPublicDTO = {
      id: raw._id,
      email: raw.email,
      name: raw.name,
      createdAt: raw.createdAt,
    };
    return output;
  }
}

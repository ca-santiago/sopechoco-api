import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user';

@Injectable()
export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public password: string,
    public createdAt: string,
  ) {}
}

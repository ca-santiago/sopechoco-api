import { Document, Schema } from 'mongoose';
import { IUserRepo } from '../interfaces/user.repo';

export type UserDocument = IUserRepo & Document;

export const UserSchema = new Schema<UserDocument>({
  _id: String,
  name: String,
  email: String,
  password: String,
  createdAt: String,
});

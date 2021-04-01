import { Document, Schema } from 'mongoose';
import { IBaseProduct } from '../interfaces/baseprod';

export type BaseProdDocument = IBaseProduct & Document;

export const BaseProdSchema = new Schema<BaseProdDocument>({
  _id: String,
  title: String,
  description: String,
  price: Number,
  available: Boolean,
  maxGuisos: Number,
  minGuisos: Number,
  guisos: [String],
  createdAt: String,
});

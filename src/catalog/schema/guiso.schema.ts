import { Document, Schema } from 'mongoose';
import { IGuiso } from '../interfaces/guiso';

export type GuisoDocument = IGuiso & Document;

export const GuisoSchema = new Schema<GuisoDocument>({
  _id: String,
  title: String,
  description: String,
  available: Boolean,
  createdAt: String,
});

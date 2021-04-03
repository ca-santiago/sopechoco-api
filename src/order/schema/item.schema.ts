import { Document, Schema } from 'mongoose';
import { IOrderItemRepo } from '../interfaces/item.repo';

export type OrderItemDocument = IOrderItemRepo & Document;

export const OrderItemSchema = new Schema({
  _id: String,
  count: Number,
  productId: String,
  details: String,
  groupId: String,
  guisos: [String],
});

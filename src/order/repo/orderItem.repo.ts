import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItemMapper } from '../mapper/orderItem.mapper';
import { OrderItemDocument } from '../schema/item.schema';
import { IOrderItem } from '../interfaces/order';

@Injectable()
export class OrderItemRepo {
  constructor(
    @InjectModel('OrderItem') private itemModel: Model<OrderItemDocument>,
    private orderItemMapper: OrderItemMapper,
  ) {}

  // TODO: Replace IOrderItem with its corresponding domain class
  save(domain: IOrderItem): Promise<void> {
    const mapped = this.orderItemMapper.toRepo(domain);
    this.itemModel
      .findByIdAndUpdate(domain.id, mapped, { upsert: true })
      .exec();
    return;
  }

  saveBulk(items: IOrderItem[]) {
    items.forEach((i) => this.save(i));
  }
}

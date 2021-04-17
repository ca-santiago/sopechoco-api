import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../domain/order';
import { OrderDocument } from '../schema/order.schema';
import { OrderMapper } from '../mapper/order.mapper';
import { OrderItemRepo } from './orderItem.repo';
import { IOrderPublicDTO } from '../interfaces/order.dto';

@Injectable()
export class OrderRepo {
  constructor(
    @InjectModel('Order') private orderModel: Model<OrderDocument>,
    private orderItemRepo: OrderItemRepo,
    private orderMapper: OrderMapper,
  ) {}

  async save(domain: Order): Promise<void> {
    const upsetData = this.orderMapper.toRepo(domain);
    try {
      // save items
      await this.orderItemRepo.saveBulk(domain.items);

      // Then save the order
      await this.orderModel
        .findByIdAndUpdate(domain.id, upsetData, { upsert: true })
        .exec();
    } catch (err) {
      // Something went wrong
      // TODO: Implement rollback
    }
    return;
  }

  async findById(id: string): Promise<Order | null> {
    const res = await this.orderModel.findById(id);
    if (res) return this.orderMapper.toDomain(res);
    return null;
  }

  // Query methods

  async findByIdToDTO(id: string) {
    const res = await this.orderModel.findById(id);
    if (res) return this.orderMapper.fromRepoToDTO(res);
    return null;
  }

  async findAllFromOwnerToDTO(ownerId: string, offset: number) {
    const results = await this.orderModel
      .find({ owner: ownerId })
      .skip(10 * offset)
      .limit(10)
      .sort('createdAt')
      .exec();
    const mapped = results.map((item) => this.orderMapper.fromRepoToDTO(item));
    return mapped;
  }

  async findToDTO(offset: number): Promise<IOrderPublicDTO[]> {
    const results = await this.orderModel
      .find()
      .skip(10 * offset)
      .limit(10)
      .sort('createdAt')
      .exec();
    const mapped = results.map((item) => this.orderMapper.fromRepoToDTO(item));
    return mapped;
  }
}

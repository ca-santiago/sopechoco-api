import { Injectable } from '@nestjs/common';
import { Order } from '../domain/order';
import { OrderStatus } from '../interfaces/order';
import { IOrderPublicDTO } from '../interfaces/order.dto';
import { IOrderRepo } from '../interfaces/order.repo';

@Injectable()
export class OrderMapper {
  toDomain(raw: IOrderRepo): Order {
    return new Order(
      raw._id,
      raw.createdAt,
      (raw.status as unknown) as OrderStatus,
      [],
      raw.groups,
    );
  }

  toRepo(o: Order): IOrderRepo {
    const output: IOrderRepo = {
      _id: o.id,
      createdAt: o.createdAt,
      groups: o.groups,
      items: o.items.map((item) => item.id),
      status: OrderStatus[(o.status as unknown) as string],
    };
    return output;
  }

  toPublicDTO(o: Order): IOrderPublicDTO {
    const output: IOrderPublicDTO = {
      id: o.id,
      status: o.status.toString(),
      items: [],
      groups: o.groups,
      createdAt: o.createdAt,
    };
    return output;
  }

  fromRepoToDTO(raw: IOrderRepo): IOrderPublicDTO {
    const mapped: IOrderPublicDTO = {
      id: raw._id,
      createdAt: raw.createdAt,
      groups: raw.groups,
      items: raw.items,
      status: raw.status,
    };
    return mapped;
  }
}

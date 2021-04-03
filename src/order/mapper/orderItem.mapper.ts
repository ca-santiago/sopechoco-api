import { Injectable } from '@nestjs/common';
import { IOrderItemPublicDTO } from '../interfaces/item.dto';
import { IOrderItem } from '../interfaces/order';
import { IOrderItemRepo } from '../interfaces/item.repo';

@Injectable()
export class OrderItemMapper {
  toDomain(raw: IOrderItemRepo): IOrderItem {
    const output: IOrderItem = {
      count: raw.count,
      details: {
        coments: raw.details,
        guisos: raw.guisos,
      },
      groupId: raw.groupId,
      id: raw._id,
      itemId: raw.itemId,
    };
    return output;
  }

  toRepo(o: IOrderItem): IOrderItemRepo {
    const output: IOrderItemRepo = {
      _id: o.id,
      details: o.details.coments || '',
      groupId: o.groupId,
      guisos: o.details.guisos,
      count: o.count,
      itemId: o.itemId,
    };
    return output;
  }

  toPublicDTO(o: IOrderItem): IOrderItemPublicDTO {
    const output: IOrderItemPublicDTO = {
      id: o.id,
      details: o.details.coments || '',
      groupId: o.groupId,
      guisos: o.details.guisos,
      count: o.count,
      itemId: o.itemId,
    };
    return output;
  }

  fromRepoToDTO(raw: IOrderItemRepo): IOrderItemPublicDTO {
    const output: IOrderItemPublicDTO = {
      count: raw.count,
      id: raw._id,
      details: raw.details,
      groupId: raw.groupId,
      guisos: raw.guisos,
      itemId: raw.itemId,
    };
    return output;
  }
}

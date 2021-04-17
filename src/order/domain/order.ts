import { IOrderItem, OrderStatus, IOrder } from '../interfaces/order';

export class Order implements IOrder {
  constructor(
    public readonly id: string,
    public readonly owner: string,
    public readonly createdAt: string,
    public readonly lastUpdate: string,
    public readonly status: OrderStatus,
    public readonly items: IOrderItem[],
    public readonly groups: string[],
  ) {}
}

export interface IOrder {
  id: string;
  owner: string;
  createdAt: string;
  lastUpdate: string;
  status: OrderStatus;
  items: IOrderItem[];
  groups: string[];
}

export enum OrderStatus {
  'PLACED',
  'CANCELED',
  'ACEPTED',
  // 'CLOSED', // ??
  'MAKING',
  'FINISHED',
}

export interface IOrderItem {
  id: string;
  count: number;
  itemId: string;
  groupId: string;
  details: ItemDetails;
}

export interface ItemDetails {
  coments: string;
  guisos: string[];
}

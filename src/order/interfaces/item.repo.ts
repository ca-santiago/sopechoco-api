export interface IOrderItemRepo {
  _id: string;
  count: number;
  itemId: string;
  groupId: string;
  details: string;
  guisos: string[];
}

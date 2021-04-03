export interface IOrderRepo {
  _id: string;
  createdAt: string;
  status: string;
  items: string[];
  groups: string[];
}

export interface IOrderRepo {
  _id: string;
  owner: string;
  createdAt: string;
  lastUpdate: string;
  status: string;
  items: string[];
  groups: string[];
}

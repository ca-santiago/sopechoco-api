export interface IBaseProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  available: boolean;
  maxGuisos: number;
  minGuisos: number;
  guisos: string[];
  createdAt: string;
}

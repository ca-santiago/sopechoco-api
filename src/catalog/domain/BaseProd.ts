import { IBaseProduct } from '../interfaces/baseprod';

export class BaseProduct implements IBaseProduct {
  constructor(
    public readonly _id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly available: boolean,
    public readonly maxGuisos: number,
    public readonly minGuisos: number,
    public readonly guisos: string[],
    public readonly createdAt: string,
  ) {}
}

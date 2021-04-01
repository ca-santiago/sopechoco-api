import { IGuiso } from '../interfaces/guiso';

export class Guiso implements IGuiso {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly available: boolean,
    public readonly createdAt: string,
  ) {}
}

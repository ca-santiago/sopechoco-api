import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseProdRepo } from 'src/catalog/repo/BaseProduct.repo';
import { GuisoRepo } from 'src/catalog/repo/guiso.repo';
import { Order } from '../domain/order';
import { OrderStatus, IOrderItem } from '../interfaces/order';
import { CreateOrderDTO, Item } from './order.dto';
import { v4 } from 'uuid';
import * as moment from 'moment';
import { BaseProduct } from 'src/catalog/domain/BaseProd';
import { OrderRepo } from '../repo/order.repo';
import { IOrderPublicDTO } from '../interfaces/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private guisoRepo: GuisoRepo,
    private productRepo: BaseProdRepo,
    private orderRepo: OrderRepo,
  ) {}
  // private orderRepo: OrderRepo,

  // Helper method of createOrder
  private async createProductFromDTO(dto: Item): Promise<IOrderItem> {
    return {
      count: dto.count,
      details: {
        coments: dto.details.comments || '',
        guisos: dto.details.guisos,
      },
      groupId: dto.groupId,
      id: v4(),
      itemId: dto.id,
    };
  }

  // Verify all those products exists
  // Helper method of createOrder
  private async verifyProducts(prods: Item[]): Promise<IOrderItem[]> {
    const res = Promise.all(
      prods.map(async (p) => {
        const res = await this.productRepo.findById(p.id);
        if (!res) throw new Error('Conflic, product does not exits');

        // Verify all guisos on product order exist and are available;
        await this.verifyGuisos(p.details.guisos, res);

        return this.createProductFromDTO(p);
      }),
    );
    return res;
  }

  // Helper method of createOrder
  private async verifyGuisos(guisos: string[], p: BaseProduct): Promise<void> {
    // given guisos legth is among max and min guisos availables on product;
    if (p.maxGuisos < guisos.length || p.minGuisos > guisos.length)
      throw new Error('Too many or much guisos for given product');
    // Return just existing ones
    const results = guisos.filter((g) => p.guisoExist(g));

    // If results length is less than given guisos arr length
    // so not all guisos are in product options
    if (results.length < guisos.length)
      throw new Error('Guiso does not exist on product options');

    // guiso available propertie to true
    const oneIsNotAvailable = guisos.find((g) => !this.isGuisoAvailable(g));
    if (oneIsNotAvailable) throw new Error('Invalid guiso');
  }

  // Helper method of createOrder
  private async isGuisoAvailable(id: string): Promise<boolean> {
    const res = await this.guisoRepo.findById(id);
    // If guiso does not exist, then return false;
    if (!res) return false;
    if (res.available == false) return false;
    return true;
  }

  async createOrder(dto: CreateOrderDTO, userId: string) {
    let items: IOrderItem[];
    try {
      items = await this.verifyProducts(dto.items);
    } catch (err) {
      console.trace(err);
      throw new HttpException('Conflic', HttpStatus.CONFLICT);
    }

    const orderInstance = new Order(
      v4(),
      userId,
      moment().format(),
      moment().format(),
      OrderStatus.PLACED,
      items,
      dto.groups,
    );
    this.orderRepo.save(orderInstance);
    return;
  }

  async getOrderById(id: string): Promise<IOrderPublicDTO | null> {
    return await this.orderRepo.findByIdToDTO(id);
  }

  async getAllOrdersByOwner(
    ownerId: string,
    page = 0,
  ): Promise<IOrderPublicDTO[]> {
    return await this.orderRepo.findAllFromOwnerToDTO(
      ownerId,
      page > 1 ? page - 1 : 0,
    );
  }
}

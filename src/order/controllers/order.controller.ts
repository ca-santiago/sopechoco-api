import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('orders')
export class OrderController {
  // constructor(private orderService: OrderService) {}

  // @Post()
  // async createOrder(@Body() dto: CreateOrderDTO, @Res() res: Response) {
  //   try {
  //     await this.orderService.createOrder(dto);
  //     res.status(201).end();
  //   } catch (err) {
  //     return err;
  //   }
  // }
}

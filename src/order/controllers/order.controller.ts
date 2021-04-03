import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDTO } from '../services/order.dto';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDTO, @Res() res: Response) {
    try {
      await this.orderService.createOrder(dto);
      res.status(201).end();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    console.log('getting by id');
    try {
      const result = await this.orderService.getOrderById(id);
      if (!result) return res.status(HttpStatus.NOT_FOUND).end();
      return res.status(HttpStatus.OK).json(result).end();
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async getAll(@Query() q, @Res() res: Response) {
    try {
      const results = await this.orderService.getAllOrders();
      if (!results) return res.status(HttpStatus.NOT_FOUND).end();
      return res.status(HttpStatus.OK).json({ results }).end();
    } catch (err) {
      throw err;
    }
  }
}

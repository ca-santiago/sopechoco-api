import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateOrderDTO } from '../services/order.dto';
import { OrderService } from '../services/order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(
    @Body() dto: CreateOrderDTO,
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      const { user } = req;
      await this.orderService.createOrder(dto, user.id);
      res.status(201).end();
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Query() q, @Res() res: Response, @Req() req) {
    try {
      const { user } = req;
      const results = await this.orderService.getAllOrdersByOwner(user.id);
      if (!results) return res.status(HttpStatus.NOT_FOUND).end();
      return res.status(HttpStatus.OK).json({ results }).end();
    } catch (err) {
      throw err;
    }
  }
}

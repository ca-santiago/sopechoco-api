import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from 'src/catalog/catalog.module';
import { OrderController } from './controllers/order.controller';
import { OrderMapper } from './mapper/order.mapper';
import { OrderItemMapper } from './mapper/orderItem.mapper';
import { OrderRepo } from './repo/order.repo';
import { OrderItemRepo } from './repo/orderItem.repo';
import { OrderItemSchema } from './schema/item.schema';
import { OrderSchema } from './schema/order.schema';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
    ]),
    CatalogModule,
  ],
  controllers: [OrderController],
  providers: [
    // SERVICES
    OrderService,
    // REPOS
    OrderRepo,
    OrderItemRepo,
    // MAPPERS
    OrderItemMapper,
    OrderMapper,
  ],
  exports: [],
})
export class OrderModule {}

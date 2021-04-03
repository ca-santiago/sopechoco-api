import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/order/controllers/order.controller';
import { OrderMapper } from 'src/order/mapper/order.mapper';
import { OrderItemMapper } from 'src/order/mapper/orderItem.mapper';
import { OrderRepo } from 'src/order/repo/order.repo';
import { OrderItemRepo } from 'src/order/repo/orderItem.repo';
import { OrderItemSchema } from 'src/order/schema/item.schema';
import { OrderSchema } from 'src/order/schema/order.schema';
import { OrderService } from 'src/order/services/order.service';
import {
  CatalogController,
  GuisoController,
} from './controllers/catalog.controller';
import { GuisoMapper } from './mapper/guiso.mapper';
import { ProductMapper } from './mapper/product.mapper';
import { BaseProdRepo } from './repo/BaseProduct.repo';
import { GuisoRepo } from './repo/guiso.repo';
import { BaseProdSchema } from './schema/baseprod.schema';
import { GuisoSchema } from './schema/guiso.schema';
import { BaseProductService } from './service/baseproduct.service';
import { GuisoService } from './service/guiso.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BaseProduct', schema: BaseProdSchema },
      { name: 'Guiso', schema: GuisoSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
    ]),
  ],
  controllers: [CatalogController, GuisoController, OrderController],
  providers: [
    BaseProductService,
    GuisoService,
    OrderService,
    BaseProdRepo,
    GuisoRepo,
    OrderRepo,
    OrderItemRepo,
    ProductMapper,
    GuisoMapper,
    OrderMapper,
    OrderItemMapper,
  ],
})
export class CatalogModule {}

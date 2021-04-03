import { Module } from '@nestjs/common';
import { GuisoMapper } from 'src/catalog/mapper/guiso.mapper';
import { ProductMapper } from 'src/catalog/mapper/product.mapper';
import { BaseProdRepo } from 'src/catalog/repo/BaseProduct.repo';
import { GuisoRepo } from 'src/catalog/repo/guiso.repo';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    // OrderService,
    // GuisoRepo,
    // BaseProdRepo,
    // GuisoMapper,
    // ProductMapper,
  ],
})
export class OrderModule {}

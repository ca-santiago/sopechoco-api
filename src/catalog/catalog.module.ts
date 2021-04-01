import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogController } from './controllers/catalog.controller';
import { BaseProductService } from './service/baseproduct.service';
import { BaseProdSchema } from './schema/baseprod.schema';
import { BaseProdRepo } from './repo/BaseProduct.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BaseProduct', schema: BaseProdSchema },
    ]),
  ],
  controllers: [CatalogController],
  providers: [BaseProductService, BaseProdRepo],
})
export class CatalogModule {}

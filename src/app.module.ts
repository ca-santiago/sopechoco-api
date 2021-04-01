import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogModule } from './catalog/catalog.module';

const mongoURL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/sopechoco';

@Module({
  imports: [MongooseModule.forRoot(mongoURL), CatalogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

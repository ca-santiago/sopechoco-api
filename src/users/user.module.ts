import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user';
import { UserMapper } from './mapper/user.mapper';
import { UserMongoRepo } from './repo/user.repo';
import { UserSchema } from './schema/user';
import { UsersService } from './services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UsersService, UserMongoRepo, UserMapper],
  exports: [UsersService],
})
export class UserModule {}

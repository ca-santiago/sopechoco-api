import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auht';
import { UserController } from './controllers/user';
import { UserMapper } from './mapper/user.mapper';
import { UserMongoRepo } from './repo/user.repo';
import { UserSchema } from './schema/user';
import { UsersService } from './services/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { jwtConstants } from './constants/jwt';
import { AuthService } from './services/auht.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    // Services
    UsersService,
    AuthService,
    // Repos
    UserMongoRepo,
    // Mappers
    UserMapper,
    // Strategies
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [UsersService, AuthService],
})
export class UserModule {}

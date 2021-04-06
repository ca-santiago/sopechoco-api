import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserAccountDTO } from '../services/dto';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}
  @Post()
  createUserAccount(@Body() dto: CreateUserAccountDTO) {
    try {
      return this.userService.createAccount(dto);
    } catch (err) {
      console.log(err);
      console.trace(err);
      throw err;
    }
  }

  @Get()
  getAllUsers() {
    try {
      return this.userService.getAllUsers();
    } catch (err) {
      console.trace(err);
      throw err;
    }
  }
}

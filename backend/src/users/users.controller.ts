import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body()
    data: {
      nickname: string;
      email: string;
      password: string;
      profile_img: string;
    },
  ) {
    return this.usersService.createUser(data);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
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
  @Post('/login')
  authUser(
    @Body()
    data: {
      email: string;
      password: string;
    },
  ) {
    return this.usersService.login(data.email, data.password);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

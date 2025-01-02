import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
    return this.usersService
      .createUser(data)
      .then((r) => {
        const response = { message: `${r.nickname}'s record was a sucess` };
        return response;
      })
      .catch((error: PrismaClientKnownRequestError) => {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Nickname or Email already exists.',
          },
          HttpStatus.CONFLICT,
          { cause: error },
        );
      });
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

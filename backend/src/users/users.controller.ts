import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from '@nestjs/common';

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
            error: error.message || 'Nickname or Email already exists.',
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
  @Put('/image')
  updateImage(@Response() res, @Body() data: { choice: string }) {
    return this.usersService
      .updateProfileImage(data.choice, res.locals.sub)
      .then(() => res.json({ message: 'Image Update Has Sucess' }));
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

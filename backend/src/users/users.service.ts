import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: {
    nickname: string;
    email: string;
    password: string;
  }) {
    const hashed_pswd = await bcrypt.hash(data.password, 8);
    data.password = hashed_pswd;
    const ndata = { ...data, profile_img: 'default' };

    if (!data.email.includes('@'))
      throw new HttpException(
        "Invalid e-mail don't have @",
        HttpStatus.LENGTH_REQUIRED,
      );
    return this.prisma.user.create({
      data: ndata,
    });
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      nickname: user.nickname,
      profile_img: user.profile_img,
    };
  }

  async updateProfileImage(choice: string, sub: number) {
    try {
      await this.prisma.user.update({
        data: { profile_img: { set: choice } },
        where: {
          id: sub,
        },
      });
    } catch (error) {
      console.log('error', error);
      throw new HttpException(
        'Error to update image',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}

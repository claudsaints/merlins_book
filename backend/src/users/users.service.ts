import { Injectable } from '@nestjs/common';
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
    profile_img: string;
  }) {
    const hashed_pswd = await bcrypt.hash(data.password, 8);
    data.password = hashed_pswd;

    return this.prisma.user.create({
      data,
    });
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Invalid password');

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
        data: { profile_img: choice },
        where: {
          id: sub,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MsXees@DN3',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}

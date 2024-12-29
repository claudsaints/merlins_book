import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async saveBook(data: {
    status: string;
    bookId: string;
    userId: number;
    link_img: string;
    title: string;
  }) {
    return this.prisma.booksInteraction.create({ data });
  }
  async removeBook(data: { status: string; bookId: string; userId: number }) {
    return this.prisma.booksInteraction.delete({ where: data });
  }
  async findUserSaves(sub: number) {
    console.log('sub: ' + sub);
    try {
      const data = await this.prisma.booksInteraction.findFirst({
        where: { userId: { equals: sub } },
      });
      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async findAll() {
    return this.prisma.booksInteraction.findMany();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async saveBook(data: { status: string; bookId: string; userId: number }) {
    return this.prisma.booksInteraction.create({ data });
  }
  async removeBook(data: { status: string; bookId: string; userId: number }) {
    return this.prisma.booksInteraction.delete({ where: data });
  }
  async findAll() {
    return this.prisma.booksInteraction.findMany();
  }
}

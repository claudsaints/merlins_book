import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async saveBook(
    data: {
      status: string;
      bookId: string;
      link_img: string;
      title: string;
    },
    userId: number,
  ) {
    const ndata = { ...data, userId };
    return this.prisma.booksInteraction.create({ data: ndata });
  }
  async removeBook(id: number, userId: number) {
    try {
      return this.prisma.booksInteraction.delete({
        where: { id: id, AND: { userId: userId } },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async findUserSaves(sub: number) {
    console.log('sub: ' + sub);
    try {
      const read = await this.prisma.booksInteraction.findMany({
        where: { userId: { equals: sub }, AND: { status: 'read' } },
        select: {
          id: true,
          bookId: true,
          status: true,
          link_img: true,
          title: true,
        },
      });
      const wishlist = await this.prisma.booksInteraction.findMany({
        where: { userId: { equals: sub }, AND: { status: 'wishlist' } },
        select: {
          id: true,
          bookId: true,
          status: true,
          link_img: true,
          title: true,
        },
      });

      const data = { wishlist: wishlist, read: read };

      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async findAll() {
    return this.prisma.booksInteraction.findMany();
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(
    data: {
      bookId: string;
      rate: number;
      comment: string;
    },
    userId: number,
  ) {
    const ndata = { ...data, userId };
    return this.prisma.reviews.create({
      data: ndata,
    });
  }
  async findReviewsOfBook(bookId: string) {
    try {
      const data = this.prisma.reviews.findMany({
        where: { bookId: bookId },
        select: {
          bookId: true,
          id: true,
          comment: true,
          rate: true,
          user: { select: { nickname: true, profile_img: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
  async findReviewsOfUser(userId: number) {
    try {
      const data = this.prisma.reviews.findMany({
        where: { userId: userId },
        select: { bookId: true, comment: true, id: true, rate: true },
        orderBy: { createdAt: 'desc' },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
}

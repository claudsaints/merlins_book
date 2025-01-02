import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(data: {
    bookId: string;
    rate: number;
    comment: string;
    userId: number;
  }) {
    return this.prisma.reviews.create({
      data,
    });
  }
  async findReviewsOfBook(bookId: string) {
    try {
      const data = this.prisma.reviews.findMany({ where: { bookId: bookId } });
      return data;
    } catch (error) {
      return error;
    }
  }
  async findReviewsOfUser(userId: number) {
    try {
      const data = this.prisma.reviews.findMany({ where: { userId: userId } });
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }
}

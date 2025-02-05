import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(
    data: { bookId: string; rate: number; comment: string },
    userId: number,
  ) {
    const ndata = { ...data, userId };
    try {
      const createdReview = await this.prisma.reviews.create({
        data: ndata,
      });
      return createdReview;
    } catch (error) {
      throw new HttpException(
        'Error creating review: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findReviewsOfBook(bookId: string) {
    try {
      const reviews = await this.prisma.reviews.findMany({
        where: { bookId: { equals: bookId } },
        select: {
          bookId: true,
          id: true,
          comment: true,
          rate: true,
          user: { select: { nickname: true, profile_img: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
      return reviews;
    } catch (error) {
      throw new HttpException(
        'Error fetching reviews for the book: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findReviewsOfUser(userId: number) {
    try {
      const reviews = await this.prisma.reviews.findMany({
        where: { userId: userId },
        select: { bookId: true, comment: true, id: true, rate: true },
        orderBy: { createdAt: 'desc' },
      });
      return reviews;
    } catch (error) {
      throw new HttpException(
        'Error fetching reviews for the user: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getMostReviewBooks() {
    try {
      const data = this.prisma.reviews.findMany({
        distinct: 'bookId',
        select: { bookId: true, rate: true },
        orderBy: { rate: 'asc' },
      });
      return data;
    } catch (error) {
      throw new HttpException(
        'Error fetching: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

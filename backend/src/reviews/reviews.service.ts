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

  async findAll() {
    return this.prisma.user.findMany();
  }
}

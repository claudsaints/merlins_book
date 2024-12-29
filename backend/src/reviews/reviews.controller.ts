import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  createReview(
    @Body()
    data: {
      bookId: string;
      rate: number;
      comment: string;
      userId: number;
    },
  ) {
    return this.reviewsService.createReview(data);
  }
  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }
}

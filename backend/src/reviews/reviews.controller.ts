import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Response } from '@nestjs/common';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post('/create')
  createReview(
    @Response() res,
    @Body()
    data: {
      bookId: string;
      rate: number;
      comment: string;
    },
  ) {
    return this.reviewsService
      .createReview(data, res.locals.sub)
      .then(() => res.json({ message: 'Created Review' }));
  }
  @Get('/find/book')
  findReviewsOfBook(@Body() data: { bookId: string }) {
    return this.reviewsService.findReviewsOfBook(data.bookId);
  }
  @Get('/find/user')
  findReviewsOfUser(@Response() res) {
    return this.reviewsService
      .findReviewsOfUser(res.locals.sub)
      .then((data) => res.json(data));
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/create')
  async createReview(
    @Body() data: { bookId: string; rate: number; comment: string },
    @Response() res,
  ) {
    try {
      await this.reviewsService.createReview(data, res.locals.sub);
      return res.status(HttpStatus.CREATED).json({ message: 'Review Created' });
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/find/book')
  async findReviewsOfBook(@Body() data: { bookId: string }) {
    try {
      const reviews = await this.reviewsService.findReviewsOfBook(data.bookId);
      return reviews;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error finding reviews of book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/find/user')
  async findReviewsOfUser(@Response() res) {
    try {
      const reviews = await this.reviewsService.findReviewsOfUser(
        res.locals.sub,
      );
      return res.json(reviews);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error finding reviews of user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/ranked')
  async getRanked() {
    try {
      const ranked = this.reviewsService.getMostReviewBooks();

      return ranked;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error to get ranked',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

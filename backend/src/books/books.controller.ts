import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post()
  saveBook(
    @Body()
    data: {
      status: string;
      bookId: string;
      userId: number;
    },
  ) {
    return this.booksService.saveBook(data);
  }
  @Delete()
  removeBook(
    @Body()
    data: {
      status: string;
      bookId: string;
    },
  ) {
    return this.booksService.removeBook(data);
  }
  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}

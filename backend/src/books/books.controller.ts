import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from '@nestjs/common';

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
      link_img: string;
      title: string;
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
      userId: number;
    },
  ) {
    return this.booksService.removeBook(data);
  }
  @Get('/saves')
  findSaves(@Response() res) {
    console.log(res.locals.sub);
    return this.booksService
      .findUserSaves(res.locals.sub)
      .then((data) => res.json(data));
  }
  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}

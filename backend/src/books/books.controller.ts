import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Post('/create')
  saveBook(
    @Response() res,
    @Body()
    data: {
      status: string;
      bookId: string;
      link_img: string;
      title: string;
    },
  ) {
    return this.booksService.saveBook(data, res.locals.sub);
  }
  @Delete('/delete')
  removeBook(
    @Response() res,
    @Body()
    data: {
      status: string;
      bookId: string;
    },
  ) {
    return this.booksService.removeBook(data, res.locals.sub);
  }
  @Get('/find')
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

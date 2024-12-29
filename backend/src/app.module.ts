import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      secret: 'MsXees@DN3',
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [
    AppController,
    UsersController,
    BooksController,
    ReviewsController,
  ],
  providers: [AppService, UsersService, BooksService, ReviewsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        {
          path: '/users/register',
          method: RequestMethod.POST,
        },
        { path: '/users/login', method: RequestMethod.POST },
      )

      .forRoutes('*');
  }
}

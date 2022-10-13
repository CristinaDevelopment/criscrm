import { Module, ValidationPipe } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
// import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { CommonModule } from './config/common.module';
import { AuthModule } from './auth/auth.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { BeveragesModule } from './beverages/beverages.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';
import { ArticlesModule } from './articles/articles.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logginf.interceptor';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProductModule,
    UserModule,
    CommentModule,
    CommonModule,
    PubSubModule,
    BeveragesModule,
    UploadModule,
    CoursesModule,
    SitesModule,
    PagesModule,
    ArticlesModule,
    FoodModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { CommonModule } from './config/common.module';
import { AuthModule } from './auth/auth.module';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { BeveragesModule } from './beverages/beverages.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { SitesModule } from './sites/sites.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    ProductModule,
    UserModule,
    BlogModule,
    CommentModule,
    CommonModule,
    AuthModule,
    PubSubModule,
    BeveragesModule,
    UploadModule,
    CoursesModule,
    SitesModule,
    PagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

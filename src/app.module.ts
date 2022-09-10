import { Module } from '@nestjs/common';
import { SiteModule } from './site/site.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';
import { CommonModule } from './config/common.module';

@Module({
  imports: [
    SiteModule,
    ProductModule,
    UserModule,
    BlogModule,
    CommentModule,
    UploadModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

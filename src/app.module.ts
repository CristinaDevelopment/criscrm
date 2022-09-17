import { Module } from '@nestjs/common';
import { SiteModule } from './site/site.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';
import { CommonModule } from './config/common.module';
import { PageModule } from './page/page.module';
import { AuthModule } from './auth/auth.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    SiteModule,
    ProductModule,
    UserModule,
    BlogModule,
    CommentModule,
    UploadModule,
    CommonModule,
    PageModule,
    AuthModule,
    PubSubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

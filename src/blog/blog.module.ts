import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog } from './entities/blog.model';
import { BlogSchema } from './entities/blog.schema';
import { BlogRepository } from './blog.repository';
import { PubSubModule } from '../pub-sub/pub-sub.module';
// hola
@Module({
  imports: [
    PubSubModule,
    MongooseModule.forFeature(
      [{ name: Blog.name, schema: BlogSchema }],
      'sitesDB',
    ),
  ],
  providers: [BlogResolver, BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}

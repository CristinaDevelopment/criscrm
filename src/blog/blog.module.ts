import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog } from './entities/blog.model';
import { BlogSchema } from './entities/blog.schema';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogResolver, BlogService, BlogRepository],
  exports: [BlogService],
})
export class BlogModule {}

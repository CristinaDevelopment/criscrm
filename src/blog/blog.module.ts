import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogV3 } from './entities/blog.model';
import { BlogV3Schema } from './entities/blog.schema';
import { BlogV3Repository } from './blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogV3.name, schema: BlogV3Schema }]),
  ],
  providers: [BlogResolver, BlogService, BlogV3Repository],
  exports: [BlogService],
})
export class BlogModule {}

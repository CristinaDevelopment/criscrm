import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Blog } from './entities/blog.model';
import { BlogDocument } from './entities/blog.schema';


@Injectable()
export class BlogRepository extends AbstractRepository<BlogDocument> {
  protected readonly logger = new Logger(BlogRepository.name);

  constructor(@InjectModel(Blog.name) blogModel: Model<BlogDocument>) {
    super(blogModel);
  }
}
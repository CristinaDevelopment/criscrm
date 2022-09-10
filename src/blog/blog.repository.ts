import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { BlogV3 } from './entities/blog.model';
import { BlogV3Document } from './entities/blog.schema';


@Injectable()
export class BlogV3Repository extends AbstractRepository<BlogV3Document> {
  protected readonly logger = new Logger(BlogV3Repository.name);

  constructor(@InjectModel(BlogV3.name) blogModel: Model<BlogV3Document>) {
    super(blogModel);
  }
}
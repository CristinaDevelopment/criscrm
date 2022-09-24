import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Article } from './entities/article.model';
import { ArticleDocument } from './entities/article.schema';

@Injectable()
export class ArticlesRepository extends AbstractRepository<ArticleDocument> {
  protected readonly logger = new Logger(ArticlesRepository.name);

  constructor(
    @InjectModel(Article.name, 'articlesDB') blogModel: Model<ArticleDocument>,
  ) {
    super(blogModel);
  }
}

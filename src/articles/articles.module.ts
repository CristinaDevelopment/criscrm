import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Article } from './entities/article.model';
import { ArticleSchema } from './entities/article.schema';
import { ArticlesRepository } from './articles.repository';

@Module({
  imports: [
    PubSubModule,
    MongooseModule.forFeature(
      [{ name: Article.name, schema: ArticleSchema }],
      'articlesDB',
    ),
  ],
  providers: [ArticlesResolver, ArticlesService, ArticlesRepository],
  exports: [ArticlesService],
})
export class ArticlesModule {}

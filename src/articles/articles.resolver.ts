import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article, ListArticleResponse } from './entities/article.model';
import { CreateArticle, UpdateArticle } from './dto/article.input';
import { PubSub } from 'graphql-subscriptions';
import { GetArticle } from './dto/article.args';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(
    private readonly blogService: ArticlesService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Article, { name: 'createArticle' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Args('input') input: CreateArticle) {
    return this.blogService.create(input);
  }

  @Subscription(() => Article)
  articleAdded() {
    return this.pubSub.asyncIterator('articleAdded');
  }

  @Mutation(() => Article, { name: 'updateArticle' })
  update(@Args() id: GetArticle, @Args('input') input: UpdateArticle) {
    return this.blogService.update(id, input);
  }

  @Query(() => Article, { name: 'findArticle' })
  findOne(@Args() id: GetArticle) {
    return this.blogService.findOne(id);
  }


  @Query(() => [Article], { name: 'findArticles' })
  findAll() {
    return this.blogService.findAll();
  }

  @Mutation(() => String, { name: 'deleteArticle' })
  deleteOne(@Args() id: GetArticle) {
    return this.blogService.deleteOne(id);
  }

  @Query(() => ListArticleResponse, { name: 'listArticlesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListArticleResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.blogService.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}

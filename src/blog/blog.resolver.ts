import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog, ListBlogResponse } from './entities/blog.model';
import { CreateBlog, UpdateBlog } from './dto/blog.input';
import { PubSub } from 'graphql-subscriptions';
import { GetBlog } from './dto/blog.args';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Blog, { name: 'createBlog' })
  create(@Args('input') input: CreateBlog) {
    return this.blogService.create(input);
  }

  @Subscription(() => Blog)
  blogAdded() {
    return this.pubSub.asyncIterator('blogAdded');
  }

  @Mutation(() => Blog, { name: 'updateBlog' })
  update(@Args() id: GetBlog, @Args('input') input: UpdateBlog) {
    return this.blogService.update(id, input);
  }

  @Query(() => Blog, { name: 'findBlog' })
  findOne(@Args() id: GetBlog) {
    return this.blogService.findOne(id);
  }

  @Query(() => [Blog], { name: 'findBlogs' })
  findAll() {
    return this.blogService.findAll();
  }

  @Mutation(() => String, { name: 'deleteBlog' })
  deleteOne(@Args() id: GetBlog) {
    return this.blogService.deleteOne(id);
  }

  @Query(() => ListBlogResponse, { name: 'listPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListBlogResponse> {
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

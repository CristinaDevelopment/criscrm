import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.model';
import { CreateBlog } from './dto/blog.input';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog, { name: 'createBlog' })
  create(@Args('input') input: CreateBlog) {
    return this.blogService.createBlog(input);
  }

  @Query(() => [Blog], { name: 'blog' })
  findAll() {
    return this.blogService.findAll();
  }

  @Query(() => Blog, { name: 'blog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
}

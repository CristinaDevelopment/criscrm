import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { BlogService } from 'src/blog/blog.service';
import { Blog } from 'src/blog/entities/blog.model';
import ConnectionArgs, { getPagingParameters } from 'src/common/pagination/relay/connection.args';
import { Product } from 'src/product/entities/product.model';
import { ProductService } from 'src/product/product.service';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { DataPage, ListPageResponse, Page0, Page1 } from '../entities/page.model';
import { Page0Service } from '../service/page0.service';
import { Page1Service } from '../service/page1.service';

@Resolver(() => Page0)
export class Page0Resolver {
  constructor(
    private readonly page0Service: Page0Service,
    private readonly page1Service: Page1Service,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,

  ) {}

  @Mutation(() => Page0, { name: 'createPage0' })
  create(@Args('input') input: CreatePage) {
    return this.page0Service.create(input);
  }

  @Mutation(() => Page0, { name: 'updatePage0' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page0Service.update(id, input);
  }

  @Query(() => Page0, { name: 'findPage0' })
  findPage(@Args() id: GetPage) {
    return this.page0Service.findPage(id);
  }

  @Query(() => [Page0], { name: 'findPages0BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page0Service.findPagesBySite(site);
  }

  @Query(() => [Page0], { name: 'findPages0' })
  findPages() {
    return this.page0Service.findPages();
  }
  
  @Mutation(() => String, { name: 'deletePage0' })
  delete(@Args() id: GetPage) {
    return this.page0Service.deletePage(id);
  }

  @Query(() => ListPageResponse, { name: 'listPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page0Service.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page0])
  getPage(@Parent() page: Page0) {
    const { _id } = page;
    return this.page1Service.findPage1(_id);
  }

  @ResolveField('blog', () => [Blog])
  getBlog(@Parent() page: Page0) {
    const { _id } = page;

    return this.blogService.findByPageId(_id);
  }
  
  @ResolveField('product', () => [Product])
  getProduct(@Parent() page: Page0) {
    const { _id, data } = page;
    const { type } = data as DataPage
    return this.productService.findByPageUid(_id, type);
  }
}

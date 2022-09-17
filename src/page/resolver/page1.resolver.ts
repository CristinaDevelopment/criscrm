import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { BlogService } from 'src/blog/blog.service';
import { Blog } from 'src/blog/entities/blog.model';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { Product } from 'src/product/entities/product.model';
import { ProductService } from 'src/product/product.service';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import {
  DataPage,
  ListPageResponse,
  Page1,
  Page2,
} from '../entities/page.model';
import { Page1Service } from '../service/page1.service';
import { Page2Service } from '../service/page2.service';

@Resolver(() => Page1)
export class Page1Resolver {
  constructor(
    private readonly page1Service: Page1Service,
    private readonly page2Service: Page2Service,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,
  ) {}

  @Mutation(() => Page1, { name: 'createPage1' })
  create(@Args('input') input: CreatePage) {
    return this.page1Service.create(input);
  }

  @Mutation(() => Page1, { name: 'updatePage1' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page1Service.update(id, input);
  }

  @Query(() => Page1, { name: 'findPage1' })
  findPage(@Args() id: GetPage) {
    return this.page1Service.findPage(id);
  }

  @Query(() => Page1, { name: 'findPage1BySite' })
  findPageBySite(@Args() input: GetSite, @Args('slug') slug: string) {
    return this.page1Service.findPageBySite(input, slug);
  }

  @Query(() => [Page1], { name: 'findPages1BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page1Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage1' })
  delete(@Args() id: GetPage) {
    return this.page1Service.deletePage(id);
  }

  @Query(() => [Page1], { name: 'findPages1' })
  findPages() {
    return this.page1Service.findPages();
  }

  @Query(() => ListPageResponse, { name: 'listPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page1Service.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page2])
  getPage(@Parent() page: Page1) {
    const { _id } = page;

    return this.page2Service.findPage2(_id);
  }

  @ResolveField('blog', () => [Blog])
  getBlog(@Parent() page: Page1) {
    const { _id } = page;

    return this.blogService.findByPageId(_id);
  }

  @ResolveField('product', () => [Product])
  getProduct(@Parent() page: Page1) {
    const { _id, data } = page;
    const { type } = data as DataPage;
    return this.productService.findByPageUid(_id, type);
  }
}

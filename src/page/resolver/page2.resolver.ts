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
  Page2,
  Page3,
} from '../entities/page.model';
import { Page2Service } from '../service/page2.service';
import { Page3Service } from '../service/page3.service';

@Resolver(() => Page2)
export class Page2Resolver {
  constructor(
    private readonly page2Service: Page2Service,
    private readonly page3Service: Page3Service,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,
  ) {}

  @Mutation(() => Page2, { name: 'createPage2' })
  create(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => Page2, { name: 'updatePage2' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page2Service.update(id, input);
  }

  @Query(() => Page2, { name: 'findPage2' })
  findPage(@Args() id: GetPage) {
    return this.page2Service.findPage(id);
  }

  @Query(() => [Page2], { name: 'findPages2BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page2Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage2' })
  delete(@Args() id: GetPage) {
    return this.page2Service.deletePage(id);
  }

  @Query(() => [Page2], { name: 'findPages2' })
  findPages() {
    return this.page2Service.findPages();
  }

  @Query(() => ListPageResponse, { name: 'listPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.all({
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
  getPage(@Parent() input: Page2) {
    return this.page3Service.findPage3(input._id);
  }

  @ResolveField('blog', () => [Blog])
  getBlog(@Parent() page: Page2) {
    const { _id } = page;

    return this.blogService.findByPageId(_id);
  }

  @ResolveField('product', () => [Product])
  getProduct(@Parent() page: Page2) {
    const { _id, data } = page;
    const { type } = data as DataPage;
    return this.productService.findByPageUid(_id, type);
  }
}

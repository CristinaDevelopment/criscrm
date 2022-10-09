import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/entities/article.model';
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
  Page,
  Page1,
  Page2,
} from '../entities/page.model';
import { Pages1Service } from '../service/pages1.service';
import { Pages2Service } from '../service/pages2.service';

@Resolver(() => Page1)
export class Pages1Resolver {
  constructor(
    private readonly page1Service: Pages1Service,
    private readonly page2Service: Pages2Service,
    private readonly productService: ProductService,
    private readonly articleService: ArticlesService,

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

  @Query(() => Page1, { name: 'findPage1BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page1Service.findPageBySlug(site, slug);
  }

  @Query(() => [Page1], { name: 'findPages1ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page1Service.findByParentId(parentId);
  }

  @Query(() => [Page1], { name: 'findPages1BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page1Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage1' })
  delete(@Args() id: GetPage) {
    return this.page1Service.deletePage(id);
  }
  @Mutation(() => String, { name: 'deletePages1' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page1Service.deletePagesById(ids);
  }
  @Query(() => [Page1], { name: 'findPages1' })
  findPages() {
    return this.page1Service.findPages();
  }

  @Query(() => ListPageResponse, { name: 'listPages1WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page1Service.all(
      {
        limit,
        offset,
      },
      parentId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page2], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page1) {
    return this.page2Service.findByParentId(_id.toString());
  }

  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page1) {
    return this.articleService.findByParentId(_id.toString());
  }
  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page1) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }
  // @ResolveField('product', () => [Product])
  // getProduct(@Parent() page: Page) {
  //   const { _id, data } = page;
  //   const { type } = data as DataPage;
  //   return this.productService.findByPageUid(_id, type);
  // }
}

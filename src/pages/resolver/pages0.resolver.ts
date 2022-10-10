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
  Page0,
  Page1,
} from '../entities/page.model';
import { Pages0Service } from '../service/pages0.service';
import { Pages1Service } from '../service/pages1.service';

@Resolver(() => Page0)
export class Pages0Resolver {
  constructor(
    private readonly page0Service: Pages0Service,
    private readonly page1Service: Pages1Service,
    private readonly articleService: ArticlesService,
    private readonly productService: ProductService,
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

  @Query(() => Page0, { name: 'findPage0BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page0Service.findPageBySlug(site, slug);
  }

  @Query(() => [Page0], { name: 'findPages0ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page0Service.findByParentId(parentId);
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

  // @Mutation(() => String, { name: 'deletePages0ByParent' })
  // deletePafesByParentId(@Args('ids', { type: () => [String] }) ids: string[]) {
  //   return this.page0Service.deletePagesByParent(ids);
  // }
  @Mutation(() => [String], { name: 'deletePages0' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    this.page1Service.deletePagesByParent(ids)
    return this.page0Service.deletePagesById(ids);
  }

  @Query(() => ListPageResponse, { name: 'listPages0WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page0Service.all(
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

  // @ResolveField('page', () => [Page])
  // getPage1(@Parent() page: Page) {
  //   const { _id } = page;
  //   return this.page1Service.findPage1(_id);
  // }

  @ResolveField('page', () => [Page1], { nullable: 'itemsAndList' })
  getPage1(@Parent() { _id }: Page0) {
    return this.page1Service.findByParentId(_id.toString());
  }

  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page0) {
    return this.articleService.findByParentId(_id.toString());
  }

  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page0) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }
}

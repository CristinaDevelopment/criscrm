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
  Page2,
  Page3,
  Page5,
  Page6,
} from '../entities/page.model';
import { Pages6Service, Pages5Service } from '../service';

@Resolver(() => Page5)
export class Pages5Resolver {
  constructor(
    private readonly page5Service: Pages5Service,
    private readonly page6Service: Pages6Service,
    private readonly articleService: ArticlesService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Page5, { name: 'createPage5' })
  create(@Args('input') input: CreatePage) {
    return this.page5Service.create(input);
  }

  @Mutation(() => Page5, { name: 'updatePage5' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page5Service.update(id, input);
  }

  @Query(() => Page5, { name: 'findPage5' })
  findPage(@Args() id: GetPage) {
    return this.page5Service.findPage(id);
  }

  @Query(() => [Page5], { name: 'findPages5' })
  findPages() {
    return this.page5Service.findPages();
  }
  @Query(() => [Page5], { name: 'findPages5ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page5Service.findByParentId(parentId);
  }
  @Query(() => Page5, { name: 'findPage5BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page5Service.findPageBySlug(site, slug);
  }
  @Query(() => [Page5], { name: 'findPages5BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page5Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage5' })
  delete(@Args() id: GetPage) {
    return this.page5Service.deletePage(id);
  }
  @Mutation(() => String, { name: 'deletePages5' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page5Service.deletePagesById(ids);
  }
  @Query(() => ListPageResponse, { name: 'listPages5WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page5Service.all(
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

  @ResolveField('page', () => [Page6], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page5) {
    return this.page6Service.findByParentId(_id.toString());
  }
  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page5) {
    return this.articleService.findByParentId(_id.toString());
  }

  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page5) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }
}

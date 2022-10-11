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
import { UpdateImage } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.model';
import { ProductService } from 'src/product/product.service';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import {
  DataPage,
  ListPageResponse,
  Page2,
  Page3,
  Page4,
  Page5,
} from '../entities/page.model';
import { Pages4Service, Pages5Service } from '../service';

@Resolver(() => Page4)
export class Pages4Resolver {
  constructor(
    private readonly page4Service: Pages4Service,
    private readonly page5Service: Pages5Service,
    private readonly articleService: ArticlesService,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Page4, { name: 'createPage4' })
  create(@Args('input') input: CreatePage) {
    return this.page4Service.create(input);
  }

  @Mutation(() => Page4, { name: 'updatePage4' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page4Service.update(id, input);
  }

  @Mutation(() => Page4, { name: 'updateImagePage4' })
  updateImage(
    @Args() id: GetPage,
    @Args('input') input: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.page4Service.updateImage(id, input, uid);
  }
  @Query(() => Page4, { name: 'findPage4' })
  findPage(@Args() id: GetPage) {
    return this.page4Service.findPage(id);
  }

  @Query(() => [Page4], { name: 'findPages4' })
  findPages() {
    return this.page4Service.findPages();
  }
  @Query(() => [Page4], { name: 'findPages4ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page4Service.findByParentId(parentId);
  }
  @Query(() => Page4, { name: 'findPage4BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page4Service.findPageBySlug(site, slug);
  }
  @Query(() => [Page4], { name: 'findPages4BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page4Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage4' })
  delete(@Args() id: GetPage) {
    return this.page4Service.deletePage(id);
  }
  @Mutation(() => [String], { name: 'deletePages4' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page4Service.deletePagesById(ids);
  }
  @Query(() => ListPageResponse, { name: 'listPages4WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page4Service.all(
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

  @ResolveField('page', () => [Page5], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page4) {
    return this.page5Service.findByParentId(_id.toString());
  }

  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page4) {
    return this.articleService.findByParentId(_id.toString());
  }

  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page4) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }
}

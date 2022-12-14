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
import { UpdateImage } from 'src/product/dto/product.input';
import { Product } from 'src/product/entities/product.model';
import { ProductService } from 'src/product/product.service';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import {
  DataPage,
  ListPageResponse,
  Page,
  Page2,
  Page3,
} from '../entities/page.model';
import { Pages2Service } from '../service/pages2.service';
import { Pages3Service } from '../service/pages3.service';

@Resolver(() => Page2)
export class Pages2Resolver {
  constructor(
    private readonly page2Service: Pages2Service,
    private readonly page3Service: Pages3Service,
    private readonly productService: ProductService,
    private readonly articleService: ArticlesService,

  ) {}

  @Mutation(() => Page2, { name: 'createPage2' })
  create(@Args('input') input: CreatePage) {
    return this.page2Service.create(input);
  }

  @Mutation(() => Page2, { name: 'updatePage2' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page2Service.update(id, input);
  }
  @Mutation(() => Page2, { name: 'updateImagePage2' })
  updateImage(
    @Args() id: GetPage,
    @Args('input') input: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.page2Service.updateImage(id, input, uid);
  }
  @Query(() => Page2, { name: 'findPage2' })
  findPage(@Args() id: GetPage) {
    return this.page2Service.findPage(id);
  }

  @Query(() => Page2, { name: 'findPage2BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page2Service.findPageBySlug(site, slug);
  }

  @Query(() => [Page2], { name: 'findPages2ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page2Service.findByParentId(parentId);
  }


  @Query(() => [Page2], { name: 'findPages2BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page2Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage2' })
  delete(@Args() id: GetPage) {
    return this.page2Service.deletePage(id);
  }
  @Mutation(() => [String], { name: 'deletePages2' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page2Service.deletePagesById(ids);
  }
  @Query(() => [Page2], { name: 'findPages2' })
  findPages() {
    return this.page2Service.findPages();
  }

  @Query(() => ListPageResponse, { name: 'listPages2WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page2Service.all(
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


  @ResolveField('page', () => [Page3], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page2) {
    return this.page3Service.findByParentId(_id.toString());
  }
  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page2) {
    return this.articleService.findByParentId(_id.toString());
  }

  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page2) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }


}

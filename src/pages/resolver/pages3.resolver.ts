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
// import { BlogService } from 'src/blog/blog.service';
// import { Blog } from 'src/blog/entities/blog.model';
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
} from '../entities/page.model';
import { Pages4Service, Pages3Service } from '../service';

@Resolver(() => Page3)
export class Pages3Resolver {
  constructor(
    private readonly page3Service: Pages3Service,
    private readonly page4Service: Pages4Service,
    private readonly productService: ProductService,
    private readonly articleService: ArticlesService,
    
  ) {}

  @Mutation(() => Page3, { name: 'createPage3' })
  create(@Args('input') input: CreatePage) {
    return this.page3Service.create(input);
  }

  @Mutation(() => Page3, { name: 'updateImagePage3' })
  updateImage(
    @Args() id: GetPage,
    @Args('input') input: UpdateImage,
    @Args('uid') uid: string,
  ) {
    return this.page3Service.updateImage(id, input, uid);
  }

  @Mutation(() => Page3, { name: 'updatePage3' })
  update(@Args() id: GetPage, @Args('input') input: UpdatePage) {
    return this.page3Service.update(id, input);
  }

  @Query(() => Page3, { name: 'findPage3' })
  findPage(@Args() id: GetPage) {
    return this.page3Service.findPage(id);
  }
  @Query(() => [Page3], { name: 'findPages3ByParent' })
  findPagesByParent(@Args('parentId') parentId: string) {
    return this.page3Service.findByParentId(parentId);
  }

  @Query(() => Page3, { name: 'findPage3BySlug' })
  findPageBySlug(@Args('site') site: string, @Args('slug') slug: string) {
    return this.page3Service.findPageBySlug(site, slug);
  }
  @Query(() => [Page3], { name: 'findPages3BySite' })
  findPagesBySite(@Args() site: GetSite) {
    return this.page3Service.findPagesBySite(site);
  }

  @Mutation(() => String, { name: 'deletePage3' })
  delete(@Args() id: GetPage) {
    return this.page3Service.deletePage(id);
  }
  @Mutation(() => [String], { name: 'deletePages3' })
  deletePagesById(@Args('ids', { type: () => [String] }) ids: string[]) {
    return this.page3Service.deletePagesById(ids);
  }
  @Query(() => [Page3], { name: 'findPages3' })
  findPages() {
    return this.page3Service.findPages();
  }

  @Query(() => ListPageResponse, { name: 'listPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('parentId') parentId: string,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page3Service.all(
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

  @ResolveField('page', () => [Page4], { nullable: 'itemsAndList' })
  getPage(@Parent() { _id }: Page3) {
    return this.page4Service.findByParentId(_id.toString());
  }

  @ResolveField('article', () => [Article], { nullable: 'itemsAndList' })
  getArticle(@Parent() { _id }: Page3) {
    return this.articleService.findByParentId(_id.toString());
  }

  @ResolveField('product', () => [Product], { nullable: 'itemsAndList' })
  getProduct(@Parent() { _id, data }: Page3) {
    const { type } = data as DataPage;
    return this.productService.findByParentId(_id.toString(), type);
  }
}

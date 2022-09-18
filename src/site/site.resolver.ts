import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from 'src/product/product.service';
import { GetSite } from './dto/site.args';
import { CreateSite, UpdateSite } from './dto/site.input';
import { ListSiteResponse, Site } from './entities/site.model';
import { SiteService } from './site.service';
import { BlogService } from 'src/blog/blog.service';
import { Page0Service } from 'src/page/service/page0.service';
import { Page0 } from '../page/entities/page.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { UpdateDataBase } from './dto/site.input';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,
    private readonly pageService: Page0Service,
  ) {}

  @Mutation(() => Site, { name: 'createSite' })
  create(@Args('input') input: CreateSite) {
    return this.siteService.create(input);
  }

  @Mutation(() => Site, { name: 'updateSite' })
  update(@Args() id: GetSite, @Args('input') input: UpdateSite) {
    return this.siteService.update(id, input);
  }
  @Mutation(() => Site, { name: 'updateDataBase' })
  updateDataBase(
    @Args() id: GetSite,
    @Args('input', { type: () => [UpdateDataBase] }) input: UpdateDataBase[],
  ) {
    return this.siteService.updateDataBase(id, input);
  }

  @Mutation(() => String, { name: 'deleteSite' })
  delete(@Args() id: GetSite) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => String, { name: 'deleteSites' })
  deleteSites() {
    return this.siteService.deleteSites();
  }

  @Query(() => Site, { name: 'findSite' })
  findSite(@Args() id: GetSite) {
    return this.siteService.findSite(id);
  }
  @Query(() => [Site], { name: 'findSites' })
  findSites() {
    return this.siteService.findSites();
  }

  @Query(() => [Site], { name: 'sitesByPagination' })
  findAll(
    @Args('input')
    input: ListInput,
  ) {
    return this.siteService.all(input);
  }

  @Query(() => ListSiteResponse, { name: 'listSitesWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListSiteResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.siteService.all({
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
  getPage(@Parent() site: Site) {
    const { _id } = site;
    return this.pageService.findPage0(_id);
  }

  // @ResolveField('product', () => [Product])
  // getProduct(@Parent() site: Site, @Args('type') type: string) {
  //   const { _id } = site;
  //   return this.productService.findBySiteId(_id, type);
  // }

  // @ResolveField('blog', () => [Blog])
  // getBlog(@Parent() input: Site) {
  //   return this.blogService.findBySiteId(input._id);
  // }
}

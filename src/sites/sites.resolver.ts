import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GetSite } from '../sites/dto/site.args';
import { CreateSite, UpdateSite } from '../sites/dto/site.input';
import { ListSiteResponse, Site } from '../sites/entities/site.model';
import { SitesService } from './sites.service';
import { Pages0Service } from 'src/pages/service/pages0.service';
import { Page0 } from '../pages/entities/page.model';
import { ListInput } from 'src/common/pagination/dto/list.input';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { UpdateDataBase } from '../sites/dto/site.input';

const page = {
  title: 'home',
  description: 'home description',
  src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
  alt: 'image home description',
  type: 'page-blank',
};

@Resolver(() => Site)
export class SitesResolver {
  constructor(
    private readonly siteService: SitesService,
    private readonly page0Service: Pages0Service,
  ) {}

  @Mutation(() => Site, { name: 'createSite' })
  async create(@Args('input') input: CreateSite) {
    const document = await this.siteService.create(input);
    this.page0Service.create({
      ...page,
      parent: document._id,
      site: document._id,
    });
    return document;
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

  @ResolveField('page', () => [Page0], { nullable: 'itemsAndList' })
  getPage0(@Parent() { _id }: Site) {
    return this.page0Service.findByParentId(_id.toString());
  }
}

// @Resolver('page')
// export class Pages0Resolver {
//   constructor(private readonly page1Service: Pages1Service) {}
//   @ResolveField('page', () => [Page])
//   getPage(@Parent() site: Page) {
//     const { _id } = site;
//     const id = _id.toString();
//     return this.page1Service.findPage1(id);
//   }
// }

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { connectionFromArraySlice } from 'graphql-relay';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import {
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

  @Query(() => ListPageResponse, { name: 'listPages3WithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListPageResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.page5Service.all({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @ResolveField('page', () => [Page6])
  getPage(@Parent() { _id }: Page5) {
    return this.page6Service.findPage6(_id.toString());
  }
}

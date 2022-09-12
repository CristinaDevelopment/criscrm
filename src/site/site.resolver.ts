import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from 'src/product/product.service';
import { GetChildren, GetSiteArgs } from './dto/site.args';
import {
  AddChildren,
  CreateSite,
  DeleteChildren,
  UpdateChildren,
  UpdateSite,
} from './dto/site.input';
import { Site } from './entities/site.model';
import { SiteService } from './site.service';
import { Product } from '../product/entities/product.model';
// import { Blog } from 'src/blog/entities/blog.model';
import { BlogService } from 'src/blog/blog.service';
import { Page0Service } from 'src/page/service/page0.service';
import { Page0 } from '../page/entities/page.model';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,
    private readonly pageService: Page0Service,
  ) {}

  @Mutation(() => Site, { name: 'createSite' })
  createSite(@Args('input') input: CreateSite) {
    return this.siteService.createSite(input);
  }

  @Mutation(() => Site, { name: 'updateSite' })
  updateSite(@Args() id: GetSiteArgs, @Args('input') input: UpdateSite) {
    return this.siteService.updateSite(id, input);
  }
  @Mutation(() => String, { name: 'deleteSite' })
  deleteSite(@Args() id: GetSiteArgs) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => String, { name: 'deleteSites' })
  deleteSites() {
    return this.siteService.deleteSites();
  }

  @Query(() => Site, { name: 'getSite' })
  getSite(@Args() id: GetSiteArgs) {
    return this.siteService.getSite(id);
  }
  @Query(() => [Site], { name: 'getSites' })
  getSites() {
    return this.siteService.getSites();
  }

  // @Query(() => Children, { name: 'getChildren' })
  // getChildren(@Args() input: GetChildren) {
  //   return this.siteService.getChildren(input);
  // }
  // @Query(() => [Children], { name: 'getChildrens' })
  // getChildrens(@Args() input: GetChildren) {
  //   return this.siteService.getChildrens(input);
  // }

  // @Mutation(() => Site, { name: 'addChildren' })
  // addChildren(@Args() id: GetSiteArgs, @Args('input') input: AddChildren) {
  //   return this.siteService.addChildren(id, input);
  // }

  // @Mutation(() => Site, { name: 'updateChildren' })
  // updateChildren(
  //   @Args() id: GetSiteArgs,
  //   @Args('input') input: UpdateChildren,
  // ) {
  //   return this.siteService.updateChildren(id, input);
  // }

  // @Mutation(() => Site, { name: 'deleteChildren' })
  // deleteChildren(
  //   @Args() id: GetSiteArgs,
  //   @Args('input') input: DeleteChildren,
  // ) {
  //   return this.siteService.deleteChildren(id, input);
  // }

  @ResolveField('page', () => [Page0])
  getPage(@Parent() site: Site) {
    const { _id } = site;
    return this.pageService.findPage0(_id);
  }

  @ResolveField('product', () => [Product])
  getProduct(@Parent() site: Site, @Args('type') type: string) {
    const { _id } = site;
    return this.productService.findBySiteId(_id, type);
  }

  // @ResolveField('blog', () => [Blog])
  // getBlog(@Parent() input: Site) {
  //   return this.blogService.findBySiteId(input._id);
  // }
}

// @Resolver('Site')
// export class SiteResolver {
//   constructor(
//     private readonly siteService: SiteService,
//     private readonly productService: ProductService,
//     private readonly blogService: BlogService,
//   ) {}
//   @ResolveField('product', () => [Product])
//   products(@Parent() site: Site, @Args('type') type: string) {
//     const { _id } = site;
//     return this.productService.findBySiteId(_id, type);
//   }
// }
// @Resolver('Children')
// export class ChildrenResolver {
//   @ResolveField('children', () => [Variant])
//   async getProductProviders (@Parent() provider: ProductHasProvider) {
//     const { id } = provider;
//     return await this.variantsService.getVariantForProvider( { id });
//   }
// }

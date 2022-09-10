import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductService } from 'src/product/product.service';
import { GetChildrenV3, GetSiteArgsV3 } from './dto/site.args';
import {
  AddChildrenV3,
  CreateSiteV3,
  DeleteChildrenV3,
  UpdateChildrenV3,
  UpdateSiteV3,
} from './dto/site.input';
import { ChildrenV3, SiteV3 } from './entities/site.model';
import { SiteV3Service } from './site.service';
import { Product } from '../product/entities/product.model';
import { BlogV3 } from 'src/blog/entities/blog.model';
import { BlogService } from 'src/blog/blog.service';

@Resolver(() => SiteV3)
export class SiteV3Resolver {
  constructor(
    private readonly siteService: SiteV3Service,
    private readonly productService: ProductService,
    private readonly blogService: BlogService,
  ) {}

  @Mutation(() => SiteV3, { name: 'createSiteV3' })
  createSite(@Args('input') input: CreateSiteV3) {
    return this.siteService.createSite(input);
  }

  @Mutation(() => SiteV3, { name: 'updateSiteV3' })
  updateSite(@Args() id: GetSiteArgsV3, @Args('input') input: UpdateSiteV3) {
    return this.siteService.updateSite(id, input);
  }
  @Mutation(() => String, { name: 'deleteSiteV3' })
  deleteSite(@Args() id: GetSiteArgsV3) {
    return this.siteService.deleteSite(id);
  }

  @Mutation(() => String, { name: 'deleteSitesV3' })
  deleteSites() {
    return this.siteService.deleteSites();
  }

  @Query(() => SiteV3, { name: 'getSiteV3' })
  getSite(@Args() id: GetSiteArgsV3) {
    return this.siteService.getSite(id);
  }
  @Query(() => [SiteV3], { name: 'getSitesV3' })
  getSites() {
    return this.siteService.getSites();
  }

  @Query(() => ChildrenV3, { name: 'getChildrenV3' })
  getChildren(@Args() input: GetChildrenV3) {
    return this.siteService.getChildren(input);
  }
  @Query(() => [ChildrenV3], { name: 'getChildrensV3' })
  getChildrens(@Args() input: GetChildrenV3) {
    return this.siteService.getChildrens(input);
  }

  @Mutation(() => SiteV3, { name: 'addChildrenV3' })
  addChildren(@Args() id: GetSiteArgsV3, @Args('input') input: AddChildrenV3) {
    return this.siteService.addChildren(id, input);
  }

  @Mutation(() => SiteV3, { name: 'updateChildrenV3' })
  updateChildren(
    @Args() id: GetSiteArgsV3,
    @Args('input') input: UpdateChildrenV3,
  ) {
    return this.siteService.updateChildren(id, input);
  }

  @Mutation(() => SiteV3, { name: 'deleteChildrenV3' })
  deleteChildren(
    @Args() id: GetSiteArgsV3,
    @Args('input') input: DeleteChildrenV3,
  ) {
    return this.siteService.deleteChildren(id, input);
  }

  @ResolveField('product', () => [Product])
  getProduct(@Parent() site: SiteV3, @Args('type') type: string) {
    const { _id } = site;
    return this.productService.findBySiteId(_id, type);
  }

  @ResolveField('blog', () => [BlogV3])
  getBlog(@Parent() input: SiteV3) {
    return this.blogService.findBySiteId(input._id);
  }
}

// @Resolver('SiteV3')
// export class SiteResolver {
//   constructor(
//     private readonly siteService: SiteV3Service,
//     private readonly productService: ProductService,
//     private readonly blogService: BlogService,
//   ) {}
//   @ResolveField('product', () => [Product])
//   products(@Parent() site: SiteV3, @Args('type') type: string) {
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

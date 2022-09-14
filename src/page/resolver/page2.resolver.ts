import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.model';
import { ProductService } from 'src/product/product.service';
import { GetPageArgs } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page2, Page3 } from '../entities/page.model';
import { Page2Service } from '../service/page2.service';
import { Page3Service } from '../service/page3.service';

@Resolver(() => Page2)
export class Page2Resolver {
  constructor(
    private readonly page2Service: Page2Service,
    private readonly page3Service: Page3Service,
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => Page2, { name: 'createPage2' })
  createPage(@Args('input') input: CreatePage) {
    return this.page2Service.createPage(input);
  }

  
  @Mutation(() => Page2, { name: 'updatePage2' })
  update(@Args() id: GetPageArgs, @Args('input') input: UpdatePage) {
    return this.page2Service.update(id, input);
  }

  @Mutation(() => String, { name: 'deletePage2' })
  delete(@Args() id: GetPageArgs) {
    return this.page2Service.deletePage(id);
  }
  @Query(() => Page2, { name: 'getPage2' })
  getPage(@Args() id: GetPageArgs) {
    return this.page2Service.getPage(id);
  }
  @Query(() => [Page2], { name: 'getPages2' })
  getPages() {
    return this.page2Service.getPages();
  }

  @ResolveField('page', () => [Page3])
  getPage2(@Parent() input: Page3) {
    return this.page3Service.findPage3(input._id);
  }

  // @ResolveField('product', () => [Product])
  // getProductClothing(@Parent() page: Page3) {
  //   const { _id } = page;
  //   return this.productService.findByPageClothing(_id);
  // }
  // @ResolveField('product', () => [Product])
  // getProductFurniture(@Parent() page: Page3) {
  //   const { _id } = page;
  //   return this.productService.findByPageFurniture(_id);
  // }

  @ResolveField('product', () => [Product])
  getProduct(@Parent() page: Page3, @Args('type') type: string) {
    const { _id } = page;
    return this.productService.findByPageUid(_id, type);
  }

}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';

import { CreateProductInput } from './dto/product.input';
import { Product } from './entities/product.model';
import { GetProductArgs, GetSiteArgs } from './dto/product.args';
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('input') input: CreateProductInput,
    @Args('type') type: string,
  ) {
    return this.productService.createProduct(input, type);
  }

  @Mutation(() => String, { name: 'deleteProduct' })
  deleteProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.deleteProduct(id, type);
  }
  
  @Mutation(() => String, { name: 'deleteProducts' })
  deleteProducts(@Args() site: GetSiteArgs, @Args('type') type: string) {
    return this.productService.deleteProducts(site, type);
  }

  @Query(() => Product, { name: 'getProduct' })
  getProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.getProduct(id, type);
  }
  @Query(() => [Product], { name: 'getProducts' })
  getProducts(@Args() site: GetSiteArgs, @Args('type') type: string) {
    return this.productService.getProducts(site, type);
  }
}

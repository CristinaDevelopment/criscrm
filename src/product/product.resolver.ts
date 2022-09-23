import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';

import { CreateProduct, UpdateProduct, UpdateImage } from './dto/product.input';
import { ListProductResponse, Product } from './entities/product.model';
import { GetPage, GetProductArgs, GetSite } from './dto/product.args';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  createProduct(
    @Args('input') input: CreateProduct,
    @Args('type') type: string,
  ) {
    return this.productService.createProduct(input, type);
  }
  @Mutation(() => Product, { name: 'updateProduct' })
  updateProduct(
    @Args() id: GetProductArgs,
    @Args('input') input: UpdateProduct,
    @Args('type') type: string,
  ) {
    return this.productService.updateProduct(id, input, type);
  }
  @Mutation(() => Product, { name: 'updateProductImage' })
  updateProductImage(
    @Args() id: GetProductArgs,
    @Args('input', { type: () => [UpdateImage] }) input: UpdateImage[],
    @Args('type') type: string,
  ) {
    return this.productService.updateProductImage(id, input, type);
  }
  @Mutation(() => String, { name: 'deleteProduct' })
  deleteProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.deleteProduct(id, type);
  }

  @Mutation(() => String, { name: 'deleteProducts' })
  deleteProducts(@Args() site: GetSite, @Args('type') type: string) {
    return this.productService.deleteProducts(site, type);
  }

  @Query(() => Product, { name: 'getProduct' })
  getProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.getProduct(id, type);
  }
  @Query(() => [Product], { name: 'getProducts' })
  getProducts(@Args('type') type: string) {
    return this.productService.getProducts(type);
  }
  @Query(() => [Product], { name: 'getAllProducts' })
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Query(() => [Product], { name: 'getProductsClothing' })
  getProductsClothing() {
    return this.productService.getProductsClothing();
  }
  @Query(() => [Product], { name: 'getProductsFurniture' })
  getProductsFurniture() {
    return this.productService.getProductsFurniture();
  }

  @Query(() => [Product], { name: 'getProductsBySite' })
  getProductsBySite(@Args() site: GetSite, @Args('type') type: string) {
    return this.productService.getProductsBySite(site, type);
  }
  @Query(() => [Product], { name: 'getProductsByPage' })
  getProductsByPage(@Args() page: GetPage, @Args('type') type: string) {
    return this.productService.getProductsByParent(page, type);
  }

  @Query(() => ListProductResponse, { name: 'listProductWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
  ): Promise<ListProductResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.productService.all(
      {
        limit,
        offset,
      },
      type,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}

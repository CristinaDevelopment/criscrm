import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';

import { CreateProduct, UpdateProduct, UpdateImage } from './dto/product.input';
import {
  ListProductResponse,
  Product,
  DeleteProducts,
} from './entities/product.model';
import { GetParent, GetProductArgs, GetSite } from './dto/product.args';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  create(@Args('input') input: CreateProduct, @Args('type') type: string) {
    return this.productService.create(input, type);
  }
  @Mutation(() => Product, { name: 'updateProduct' })
  update(
    @Args() id: GetProductArgs,
    @Args('input') input: UpdateProduct,
    @Args('type') type: string,
  ) {
    return this.productService.update(id, input, type);
  }
  @Mutation(() => Product, { name: 'updateProductImage' })
  updateImage(
    @Args() id: GetProductArgs,
    @Args('input', { type: () => [UpdateImage] }) input: UpdateImage[],
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.productService.updateImage(id, input, type, uid);
  }
  @Mutation(() => String, { name: 'deleteProduct' })
  deleteProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.deleteProduct(id, type);
  }

  @Mutation(() => String, { name: 'deleteProducts' })
  deleteProducts(@Args() site: GetSite, @Args('type') type: string) {
    return this.productService.deleteProducts(site, type);
  }
  @Mutation(() => DeleteProducts, { name: 'deleteProductsById' })
  deleteProductsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('type') type: string,
  ) {
    return this.productService.deleteProductsById(ids, type);
  }

  @Query(() => Product, { name: 'findProduct' })
  findProduct(@Args() id: GetProductArgs, @Args('type') type: string) {
    return this.productService.findProduct(id, type);
  }
  @Query(() => [Product], { name: 'findProducts' })
  findProducts(@Args('type') type: string) {
    return this.productService.findProducts(type);
  }
  @Query(() => [Product], { name: 'findAllProducts' })
  findAllProducts() {
    return this.productService.findAllProducts();
  }
  // @Query(() => [Product], { name: 'findProductsClothing' })
  // findProductsClothing() {
  //   return this.productService.findProductsClothing();
  // }
  // @Query(() => [Product], { name: 'findProductsFurniture' })
  // findProductsFurniture() {
  //   return this.productService.findProductsFurniture();
  // }

  // @Query(() => [Product], { name: 'findProductsBySite' })
  // findProductsBySite(@Args() siteID: GetSite, @Args('type') type: string) {
  //   return this.productService.findProductsBySite(siteID, type);
  // }
  @Query(() => [Product], { name: 'findProductsByParent' })
  findProductsByParent(
    @Args() { parentId }: GetParent,
    @Args('type') type: string,
  ) {
    return this.productService.findProductsByParent(parentId, type);
  }
  @Query(() => [Product], { name: 'findAllProductsByParent' })
  findAllProductsByParent(@Args() { parentId }: GetParent) {
    return this.productService.findAllProductsByParent(parentId);
  }

  @Query(() => ListProductResponse, { name: 'listProductWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
    @Args('siteId') siteId: string,
  ): Promise<ListProductResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.productService.all(
      {
        limit,
        offset,
      },
      type,
      siteId,
    );
    const page = connectionFromArraySlice(data, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }
}

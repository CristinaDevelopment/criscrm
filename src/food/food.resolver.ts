import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodService } from './food.service';

import { CreateFood, UpdateFood } from './dto/food.input';
import { ListFoodResponse, Food, DeleteFoods } from './entities/food.model';
import { GetParent, GetFoodArgs, GetSite } from './dto/food.args';
import ConnectionArgs, {
  getPagingParameters,
} from 'src/common/pagination/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { UpdateImage } from 'src/product/dto/product.input';
@Resolver(() => Food)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Mutation(() => Food, { name: 'createFood' })
  create(@Args('input') input: CreateFood, @Args('type') type: string) {
    return this.foodService.create(input, type);
  }
  @Mutation(() => Food, { name: 'updateFood' })
  update(
    @Args() id: GetFoodArgs,
    @Args('input') input: UpdateFood,
    @Args('type') type: string,
  ) {
    return this.foodService.update(id, input, type);
  }
  @Mutation(() => Food, { name: 'updateFoodImage' })
  updateImage(
    @Args() id: GetFoodArgs,
    @Args('input', { type: () => [UpdateImage] }) input: UpdateImage[],
    @Args('type') type: string,
    @Args('uid') uid: string,
  ) {
    return this.foodService.updateImage(id, input, type, uid);
  }
  @Mutation(() => String, { name: 'deleteFood' })
  deleteFood(@Args() id: GetFoodArgs, @Args('type') type: string) {
    return this.foodService.deleteFood(id, type);
  }

  @Mutation(() => String, { name: 'deleteFoods' })
  deleteFoods(@Args() site: GetSite, @Args('type') type: string) {
    return this.foodService.deleteFoods(site, type);
  }
  @Mutation(() => [String], { name: 'deleteFoodsById' })
  deleteFoodsById(
    @Args('ids', { type: () => [String] }) ids: string[],
    @Args('type') type: string,
  ) {
    return this.foodService.deleteFoodsById(ids, type);
  }

  @Query(() => Food, { name: 'findFood' })
  findFood(@Args() id: GetFoodArgs, @Args('type') type: string) {
    return this.foodService.findFood(id, type);
  }
  @Query(() => [Food], { name: 'findFoods' })
  findFoods(@Args('type') type: string) {
    return this.foodService.findFoods(type);
  }
  @Query(() => [Food], { name: 'findAllFoods' })
  findAllFoods() {
    return this.foodService.findAllFoods();
  }
  @Query(() => [Food], { name: 'findFoodsByParent' })
  findFoodsByParent(
    @Args() { parentId }: GetParent,
    @Args('type') type: string,
  ) {
    return this.foodService.findFoodsByParent(parentId, type);
  }
  @Query(() => [Food], { name: 'findAllFoodsByParent' })
  findAllFoodsByParent(@Args() { parentId }: GetParent) {
    return this.foodService.findAllFoodsByParent(parentId);
  }

  @Query(() => ListFoodResponse, { name: 'listFoodWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
    @Args('type') type: string,
    @Args('siteId') siteId: string,
  ): Promise<ListFoodResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { data, count } = await this.foodService.all(
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

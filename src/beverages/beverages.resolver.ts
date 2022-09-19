import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BeveragesService } from './beverages.service';
import { Beverage } from './entities/beverage.entity';
import { CreateBeverageInput } from './dto/create-beverage.input';
import { UpdateBeverageInput } from './dto/update-beverage.input';

@Resolver(() => Beverage)
export class BeveragesResolver {
  constructor(private readonly beveragesService: BeveragesService) {}

  @Mutation(() => Beverage)
  createBeverage(@Args('createBeverageInput') createBeverageInput: CreateBeverageInput) {
    return this.beveragesService.create(createBeverageInput);
  }

  @Query(() => [Beverage], { name: 'beverages' })
  findAll() {
    return this.beveragesService.findAll();
  }

  @Query(() => Beverage, { name: 'beverage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.beveragesService.findOne(id);
  }

  @Mutation(() => Beverage)
  updateBeverage(@Args('updateBeverageInput') updateBeverageInput: UpdateBeverageInput) {
    return this.beveragesService.update(updateBeverageInput.id, updateBeverageInput);
  }

  @Mutation(() => Beverage)
  removeBeverage(@Args('id', { type: () => Int }) id: number) {
    return this.beveragesService.remove(id);
  }
}

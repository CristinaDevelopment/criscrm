import { CreateBeverageInput } from './create-beverage.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBeverageInput extends PartialType(CreateBeverageInput) {
  @Field(() => Int)
  id: number;
}

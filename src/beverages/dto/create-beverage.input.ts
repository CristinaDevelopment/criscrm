import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBeverageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

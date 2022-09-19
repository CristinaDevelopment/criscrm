import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Beverage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

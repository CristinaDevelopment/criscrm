import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Product {
  @Field()
  name: string;
}

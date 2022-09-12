import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';

@ObjectType()
export class User extends AbstractModel {
  @Field(() => DataUser)
  readonly data: DataUser | string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field()
  readonly site: string;
  
  
}

@ObjectType()
export class DataUser {
  @Field()
  readonly name: string;

  @Field()
  readonly role: string;
  
  @Field()
  readonly image: string;
  
  @Field(() => Boolean)
  readonly status: boolean;
  @Field(() => Boolean)
  readonly google: boolean;
}
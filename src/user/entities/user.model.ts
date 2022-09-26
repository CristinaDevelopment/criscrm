import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, UpdateDate } from 'src/common/model/model';

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
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

// @ObjectType()
// export class UpdateDateUser {
//   @Field()
//   createdAt: Date;
//   @Field()
//   updatedAt: Date;
// }

@ObjectType()
export class DataUser {
  @Field()
  readonly username: string;

  @Field()
  readonly role: string;
  
  @Field(() => Image)
  readonly image: Image | string;
  
  @Field(() => Boolean)
  readonly status: boolean;
  @Field(() => OAuth)
  readonly oAuth: OAuth | string;
}

@ObjectType()
export class OAuth {
  @Field()
  provider: string
}

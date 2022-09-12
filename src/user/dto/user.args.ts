import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @Field(() => ID)
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
@ArgsType()
export class GetSiteArgs {
  @Field()
  site: string;
}
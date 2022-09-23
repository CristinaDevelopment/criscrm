import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
@ArgsType()
export class GetPage {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
@ArgsType()
export class GetSite {
  @Field()
  site: string;
}
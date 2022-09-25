import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetUser {
  @Field(() => ID)
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
@ArgsType()
export class GetSite {
  @Field()
  siteId: string;
}

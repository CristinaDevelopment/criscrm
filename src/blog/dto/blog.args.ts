import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetBlog {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
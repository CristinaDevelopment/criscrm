import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetBlogArgs {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateArticle {
  @Field()
  @IsString()
  readonly title: string;

  @Field()
  @IsString()
  readonly author: string;

  @Field()
  @IsString()
  readonly description: string;

  @Field()
  @IsString()
  readonly site: string;

  @Field()
  @IsString()
  readonly parent: string;

  @Field()
  @IsString()
  readonly category: string;
}

@InputType()
export class UpdateArticle extends PartialType(CreateArticle) {
  @Field()
  @IsString()
  readonly src: string;

  @Field()
  @IsString()
  readonly alt: string;
  @Field()
  @IsString()
  readonly content: string;

  @Field()
  @IsString()
  readonly meta: string;

  @Field(() => [String])
  @IsString({ each: true })
  readonly tags: string[];
}

import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';


@InputType()
export class CreateArticle {
  @Field()
  readonly title: string;
  @Field()
  readonly author: string;
  @Field()
  readonly description: string;
  @Field()
  readonly site: string;
  @Field()
  readonly parent: string;
  @Field()
  readonly category: string;
}

@InputType()
export class UpdateArticle extends OmitType(CreateArticle, ['site', 'parent']) {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
  @Field()
  readonly content: string;
  @Field()
  readonly meta: string;
  @Field(() => [String])
  readonly tags: string[];
}
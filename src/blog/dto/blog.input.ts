import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';


@InputType()
export class CreateBlog {
  @Field()
  readonly title: string;
  @Field()
  readonly author: string;
  @Field()
  readonly description: string;
  @Field()
  readonly site: string;
  @Field()
  readonly page: string;
  @Field()
  readonly category: string;
}

@InputType()
export class UpdateBlog extends OmitType(CreateBlog, ['site', 'page']) {
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
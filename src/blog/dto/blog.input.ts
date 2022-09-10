import { InputType, Field, PartialType } from '@nestjs/graphql';


@InputType()
export class CreateBlogV3 {
  @Field()
  readonly title: string;
  @Field()
  readonly content: string;
  @Field()
  readonly meta: string;
  @Field(() => [String])
  readonly tags: string[];
  @Field()
  readonly author: string;
  @Field()
  readonly description: string;
  @Field()
  readonly site: string;
  @Field()
  readonly category: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@InputType()
export class UpdateBlogV3 extends PartialType(CreateBlogV3) {}
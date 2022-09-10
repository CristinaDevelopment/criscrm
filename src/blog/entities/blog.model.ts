import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';

@ObjectType()
export class BlogV3 extends AbstractModel {
  @Field(() => DataBlogV3)
  readonly data: DataBlogV3 | string;
  @Field()
  readonly site: string;
  @Field()
  readonly category: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field({ nullable: true })
  readonly updatedAt?: Date;
}

@ObjectType()
export class DataBlogV3 {
  @Field()
  readonly title: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly content: string;
  @Field()
  readonly description: string;
  @Field()
  readonly meta: string;
  @Field(() => [TagsV3])
  readonly tags: TagsV3[];
  @Field()
  readonly author: string;
  @Field(() => ImageV3Blog)
  readonly thumbnail: ImageV3Blog | string;
  // @Field(() => Timestamps)
  // readonly timestamps: Timestamps | number;
  @Field(() => SeoV3Blog)
  readonly seo: SeoV3Blog | string;
}



@ObjectType()
class SeoV3Blog {
  @Field()
  readonly name: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;

  @Field(() => ImageV3Blog)
  readonly image: ImageV3Blog | string;
}
@ObjectType()
export class TagsV3 {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
}

@ObjectType()
export class ImageV3Blog {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}
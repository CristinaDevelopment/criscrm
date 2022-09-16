import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';

@ObjectType()
export class Blog extends AbstractModel {
  @Field(() => DataBlog)
  readonly data: DataBlog | string;
  @Field()
  readonly site: string;
  @Field()
  readonly page: string;

  @Field(() => UpdateDateBlog)
  readonly updateDate: UpdateDateBlog | string;
}

@ObjectType()
export class UpdateDateBlog {
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class DataBlog {
  @Field()
  readonly title: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly content: string;
  @Field()
  readonly category: string;
  @Field()
  readonly description: string;
  @Field()
  readonly meta: string;
  @Field(() => [Tags])
  readonly tags: Tags[];
  @Field()
  readonly author: string;
  @Field(() => ImageBlog)
  readonly thumbnail: ImageBlog | string;
  // @Field(() => Timestamps)
  // readonly timestamps: Timestamps | number;
  @Field(() => SeoBlog)
  readonly seo: SeoBlog | string;
}



@ObjectType()
class SeoBlog {
  @Field()
  readonly name: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;

  @Field(() => ImageBlog)
  readonly image: ImageBlog | string;
}
@ObjectType()
export class Tags {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
}

@ObjectType()
export class ImageBlog {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}
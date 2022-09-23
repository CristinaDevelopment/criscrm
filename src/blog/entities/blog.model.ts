import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';

@ObjectType()
export class Blog extends AbstractModel {
  @Field(() => DataBlog)
  readonly data: DataBlog | string;
  @Field()
  readonly site: string;
  @Field()
  readonly page: string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}
@ObjectType()
export class DataBlog {
  @Field()
  readonly title: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly content?: string;
  @Field()
  readonly category: string;
  @Field()
  readonly description: string;
  @Field()
  readonly meta?: string;
  @Field(() => [Tags])
  readonly tags?: Tags[];
  @Field()
  readonly author: string;
  @Field(() => Image)
  readonly thumbnail?: Image | string;
  @Field(() => Seo)
  readonly seo: Seo | string;
}
@ObjectType()
export class Tags {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
}
@ObjectType()
export class ListBlogResponse extends RelayTypes<Blog>(Blog) {}
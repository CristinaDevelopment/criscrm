import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, Tags, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';

@ObjectType()
export class Article extends AbstractModel {
  @Field(() => DataArticle)
  readonly data: DataArticle | string;
  @Field()
  readonly site: string;
  @Field()
  readonly parent: string;
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}
@ObjectType()
export class DataArticle {
  @Field()
  readonly title: string;
  @Field()
  readonly slug: string;
  @Field({ nullable: true })
  readonly content?: string;
  @Field()
  readonly category: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly meta?: string;
  @Field(() => [Tags], { nullable: 'itemsAndList' })
  readonly tags?: Tags[];
  @Field()
  readonly author: string;
  @Field(() => Image, { nullable: true })
  readonly thumbnail?: Image | string;
  @Field(() => Seo)
  readonly seo: Seo | string;
}

@ObjectType()
export class ListArticleResponse extends RelayTypes<Article>(Article) {}

import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, Tags, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Promotion } from 'src/product/entities/product.model';

@ObjectType()
export class Food extends AbstractModel {
  @Field(() => DataFood)
  readonly data: DataFood | string;

  @Field()
  readonly site: string;

  @Field()
  readonly type: string;

  @Field()
  readonly parent: string;

  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class DataFood {
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly price: number;
  @Field()
  readonly discountPrice: number;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly preparation?: string;
  @Field({ nullable: true })
  readonly prescription?: string;
  @Field(() => Promotion)
  readonly promotion: Promotion | string;

  @Field({ nullable: true })
  readonly details?: string;

  @Field({ nullable: true })
  readonly featured?: string;

  @Field({ nullable: true })
  readonly specs?: string;

  @Field(() => [Tags])
  readonly tags?: Tags[];

  @Field(() => [Image])
  readonly image: Image[];

  @Field(() => Seo)
  readonly seo: Seo | string;
}


@ObjectType()
export class DeleteFoods {
  @Field(() => [String])
  ids: string[];
  @Field()
  type: string;
}

@ObjectType()
export class ListFoodResponse extends RelayTypes<Food>(Food) {}

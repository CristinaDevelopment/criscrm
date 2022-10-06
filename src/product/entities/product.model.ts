import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, Tags, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';

@ObjectType()
export class Product extends AbstractModel {
  @Field(() => DataProduct)
  readonly data: DataProduct | string;

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
export class DataProduct {
  @Field()
  readonly name: string;
  @Field()
  readonly slug: string;
  @Field()
  readonly mark: string;
  @Field()
  readonly inStock: number;
  @Field()
  readonly price: number;
  @Field()
  readonly discountPrice: number;
  @Field()
  readonly description: string;
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
export class Promotion {
  @Field()
  name: string;
  @Field()
  href: string;
}
// @ObjectType()
// export class Detail {
//   @Field()
//   material: string;
//   @Field()
//   color: string;
//   @Field()
//   finishing: string;
//   @Field()
//   logo: string;
//   @Field()
//   accessories: string;
//   @Field(() => [String])
//   dimensions: string[];
// }



// @ObjectType()
// export class SpecsProduct {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly text: string;
// }
// @ObjectType()
// export class Route {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly name: string;
//   @Field()
//   readonly href: string;
// }
// //TODO: articleType

@ObjectType()
export class ColorProduct {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly class: string;
  @Field()
  readonly selectedClass: string;
}

@ObjectType()
export class SizesProduct {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly inStock: number;
}

@ObjectType()
export class Clothing extends Product {}
@ObjectType()
export class Backpack extends Product {}
@ObjectType()
export class Handbag extends Product {}

@ObjectType()
export class Furniture extends Product {}

@ObjectType()
export class HardwareStore extends Product {}

@ObjectType()
export class Glasses extends Product {}
@ObjectType()
export class Engine extends Product {}

@ObjectType()
export class ListProductResponse extends RelayTypes<Product>(Product) {}

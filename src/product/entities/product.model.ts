import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract';
import { Image, Seo, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';

@ObjectType()
export class Product extends AbstractModel {
  @Field(() => Article)
  readonly article: Article | string;

  @Field()
  readonly site: string;

  @Field()
  readonly page: string;

  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

@ObjectType()
export class Article {
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
  @Field(() => Featured)
  readonly featured: Featured | string;
  @Field(() => Detail, { nullable: true })
  readonly details?: Detail | string;

  @Field(() => [SpecsProduct])
  readonly specs?: SpecsProduct[];

  @Field(() => [TagsProduct])
  readonly tags?: TagsProduct[];

  @Field(() => [Image], { nullable: true })
  readonly image?: Image[];

  @Field(() => Seo)
  readonly seo: Seo | string;
}



@ObjectType()
export class Featured {
  @Field()
  name: string;
  @Field()
  href: string;
}
@ObjectType()
export class Detail {
  @Field()
  material: string;
  @Field()
  color: string;
  @Field()
  finishing: string;
  @Field()
  logo: string;
  @Field()
  accessories: string;
  @Field(() => [String])
  dimensions: string[];
}

// @ObjectType()
// export class ImageProduct {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly src: string;
//   @Field()
//   readonly alt: string;
// }

// @ObjectType()
// export class ImageProduct extends Image {}

// @ObjectType()
// export class Seo {
//   @Field()
//   readonly name: string;
//   @Field()
//   readonly href: string;
//   @Field()
//   readonly description: string;
//   // @Field(() => ImageProduct)
//   // readonly icon?: ImageProduct | string;
//   @Field(() => ImageProduct)
//   readonly image: ImageProduct | string;
// }

@ObjectType()
export class TagsProduct {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
}

@ObjectType()
export class SpecsProduct {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
}
@ObjectType()
export class Route {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly href: string;
}
//TODO: articleType

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
export class Furniture extends Product {}

@ObjectType()
export class ListProductResponse extends RelayTypes<Product>(Product) {}

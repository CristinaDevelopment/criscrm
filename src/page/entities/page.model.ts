import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.model';
import { AbstractModel } from '../../common/abstract/abstract.model';

@ObjectType()
export class Page extends AbstractModel {
  @Field(() => DataPage)
  readonly data: DataPage | string;
  @Field()
  readonly slug: string;
  @Field(() => [ComponentPage])
  readonly section?: ComponentPage[];
  @Field(() => [Page], { nullable: 'itemsAndList' })
  readonly page?: Page[];
}

@ObjectType()
export class DataPage {
  @Field()
  readonly type: string;
  @Field(() => ImagePage)
  readonly icon?: ImagePage | string;
  @Field(() => SeoPage)
  readonly seo: SeoPage | string;
}

@ObjectType()
export class SeoPage {
  @Field()
  readonly title: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;

  @Field(() => ImagePage)
  readonly image: ImagePage | string;
}

@ObjectType()
export class ImagePage {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@ObjectType()
export class ComponentPage {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class Page0 extends Page {}
@ObjectType()
export class Page1 extends Page {}
@ObjectType()
export class Page2 extends Page {}
@ObjectType()
export class Page3 extends Page {}
@ObjectType()
export class Page4 extends Page {}
@ObjectType()
export class Page5 extends Page {}
@ObjectType()
export class Page6 extends Page {}
@ObjectType()
export class Page7 extends Page {}
@ObjectType()
export class Page8 extends Page {}
@ObjectType()
export class Page9 extends Page {}
@ObjectType()
export class Page10 extends Page {}

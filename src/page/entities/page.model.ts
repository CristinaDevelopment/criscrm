import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from 'src/blog/entities/blog.model';
import { Image, Seo, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
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
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
  @Field(() => [Page], { nullable: 'itemsAndList' })
  readonly page?: Page[];
  @Field(() => [Product], { nullable: 'itemsAndList' })
  readonly product?: Product[];
  @Field(() => [Blog], { nullable: true })
  readonly blog?: Blog[];
}



@ObjectType()
export class DataPage {
  @Field()
  readonly type: string;
  @Field(() => Image)
  readonly icon?: Image | string;
  @Field(() => Seo)
  readonly seo: Seo | string;
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

@ObjectType()
export class ListPageResponse extends RelayTypes<Page>(Page) {}
import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.model';
import { AbstractModel } from '../../common/abstract/abstract.model';
import { BlogV3 } from '../../blog/entities/blog.model';

@ObjectType()
export class SiteV3 extends AbstractModel {
  @Field(() => DataV3)
  readonly data: DataV3 | string;
  @Field(() => [ChildrenV3])
  readonly children: ChildrenV3[];
  @Field(() => [RegisterV3])
  readonly register: RegisterV3[];
  @Field()
  readonly client: string;
  @Field()
  readonly url: string;
  @Field(() => [Product])
  readonly product?: Product[];
  @Field(() => [BlogV3])
  readonly blog?: BlogV3[];
}

@ObjectType()
export class RegisterV3 {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly change: string;
  @Field()
  readonly role: string;
  @Field()
  readonly date: string;
}
@ObjectType()
export class DataV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly numberPhone: number;
  @Field()
  readonly address: string;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly users: string[];
  @Field({ nullable: true })
  readonly location?: string;
  @Field(() => [DataBaseV3])
  readonly dataBase: DataBaseV3[];
  @Field()
  readonly description: string;
  @Field(() => DomainV3)
  readonly domain: DomainV3 | string;
  @Field(() => ImageV3)
  readonly image?: ImageV3 | string;
  @Field(() => ImageV3)
  readonly logo?: ImageV3 | string;
  @Field(() => ImageV3)
  readonly icon?: ImageV3 | string;
}

@ObjectType()
export class ChildrenV3 {
  @Field()
  readonly uid: string;
  @Field(() => SeoV3)
  readonly seo: SeoV3 | string;
  @Field(() => [ChildrenV3], { nullable: true })
  readonly children?: ChildrenV3[];
  @Field(() => ImageV3)
  readonly icon?: ImageV3 | string;
  @Field()
  readonly type?: string;
  @Field()
  readonly slug: string;
  @Field(() => [ComponentV3], { nullable: true })
  readonly section?: ComponentV3[];
  @Field(() => [Product], { nullable: true })
  readonly product?: Product[];
}

@ObjectType()
export class ComponentV3 {
  @Field()
  readonly uid: string;
  @Field()
  readonly component: string;
  @Field()
  readonly html: string;
}

@ObjectType()
export class SeoV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;

  @Field(() => ImageV3)
  readonly image: ImageV3 | string;
}

@ObjectType()
export class DataBaseV3 {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;

  @Field(() => ImageV3)
  readonly image: ImageV3 | string;
}

@ObjectType()
export class ImageV3 {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}
@ObjectType()
export class DomainV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly dlt: string;
}

@ObjectType()
export class UserV3 extends AbstractModel {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;

  @Field(() => ImageV3)
  readonly image: ImageV3 | string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Image, UpdateDate } from 'src/common/model/model';
import { RelayTypes } from 'src/common/pagination/relay/relay.types';
import { Product } from 'src/product/entities/product.model';
import { AbstractModel } from '../../common/abstract/abstract.model';
// import { Blog } from '../../blog/entities/blog.model';
import { Page0 } from '../../page/entities/page.model';

@ObjectType()
export class Site extends AbstractModel {
  @Field(() => Data)
  readonly data: Data | string;
  // @Field(() => [Children])
  // readonly children: Children[];
  // @Field(() => [Register])
  // readonly register: Register[];
  @Field()
  readonly client: string;
  @Field()
  readonly url: string;
  // @Field(() => [Product], { nullable: 'itemsAndList' })
  // readonly product?: Product[];
  @Field(() => [Page0], { nullable: 'itemsAndList' })
  readonly page?: Page0[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}

// @ObjectType()
// export class UpdateDateSite {
//   @Field()
//   createdAt: Date;
//   @Field(() => [Register], { nullable: true })
//   readonly register?: Register[];
// }

// @ObjectType()
// export class Register {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly change: string;
//   @Field()
//   updatedAt: Date;
// }
@ObjectType()
export class Data {
  @Field()
  readonly name: string;
  @Field({ nullable: true })
  readonly numberPhone?: number;
  @Field({ nullable: true })
  readonly address?: string;
  @Field()
  readonly type: string;
  @Field(() => [String])
  readonly users: string[];
  @Field({ nullable: true })
  readonly location?: string;
  @Field(() => [DataBase])
  readonly dataBase: DataBase[];
  @Field()
  readonly description: string;
  @Field(() => Domain)
  readonly domain: Domain | string;
  @Field(() => Image, { nullable: true })
  readonly image?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly logo?: Image | string;
  @Field(() => Image, { nullable: true })
  readonly icon?: Image | string;
}

// @ObjectType()
// export class Children {
//   @Field()
//   readonly uid: string;
//   @Field(() => Seo)
//   readonly seo: Seo | string;
//   @Field(() => [Children], { nullable: true })
//   readonly children?: Children[];
//   @Field(() => Image)
//   readonly icon?: Image | string;
//   @Field()
//   readonly type?: string;
//   @Field()
//   readonly slug: string;
//   @Field(() => [Component], { nullable: true })
//   readonly section?: Component[];
//   @Field(() => [Product], { nullable: true })
//   readonly product?: Product[];
// }

// @ObjectType()
// export class Component {
//   @Field()
//   readonly uid: string;
//   @Field()
//   readonly component: string;
//   @Field()
//   readonly html: string;
// }

// @ObjectType()
// export class Seo {
//   @Field()
//   readonly name: string;
//   @Field()
//   readonly href: string;
//   @Field()
//   readonly description: string;

//   @Field(() => Image)
//   readonly image: Image | string;
// }

@ObjectType()
export class DataBase {
  @Field()
  readonly uid: string;
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;

  @Field(() => Image)
  readonly image: Image | string;
}

// @ObjectType()
// export class Image {
//   @Field()
//   readonly src: string;
//   @Field()
//   readonly alt: string;
// }
@ObjectType()
export class Domain {
  @Field()
  readonly name: string;
  @Field()
  readonly dlt: string;
}

@ObjectType()
export class User extends AbstractModel {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;

  @Field(() => Image)
  readonly image: Image | string;
}

@ObjectType()
export class ListSiteResponse extends RelayTypes<Site>(Site) {}

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
  @Field()
  readonly client: string;
  @Field()
  readonly url: string;
  @Field(() => [Page0], { nullable: 'itemsAndList' })
  readonly page?: Page0[];
  @Field(() => UpdateDate)
  readonly updateDate: UpdateDate | string;
}


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

@ObjectType()
export class DataBase {
  @Field()
  readonly uid: string;
  // @Field()
  // readonly name: string;
  @Field()
  readonly type: string;

  // @Field(() => Image)
  // readonly image: Image | string;
}


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

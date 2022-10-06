import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@ObjectType()
export class Seo {
  @Field()
  readonly title: string;
  @Field()
  readonly href: string;
  @Field()
  readonly description: string;
  @Field(() => Image)
  readonly image: Image | string;
}

@ObjectType()
export class UpdateDate {
  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  lastUpdatedAt?: Date;
  @Field(() => [Register], { nullable: true })
  readonly register?: Register[];
}

@ObjectType()
export class Register {
  @Field({ nullable: true })
  readonly uid?: string;
  @Field({ nullable: true })
  readonly change?: string;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Tags {
  @Field()
  readonly uid: string;
  @Field()
  readonly text: string;
  @Field()
  readonly href: string;
}
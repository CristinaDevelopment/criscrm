import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateSiteV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly numberPhone: number;
  @Field()
  readonly address: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field()
  readonly client: string;
  @Field()
  readonly userName: string;
  @Field()
  readonly change: string;
  @Field()
  readonly role: string;
  @Field()
  readonly uid: string;
}
@InputType()
export class UpdateDataBaseV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}

@InputType()
export class ChildrenV3 {
  @Field({ nullable: true })
  readonly children_uid_0?: string;
  @Field({ nullable: true })
  readonly children_uid_1?: string;
  @Field({ nullable: true })
  readonly children_uid_2?: string;
  @Field({ nullable: true })
  readonly children_uid_3?: string;
  @Field({ nullable: true })
  readonly children_uid_4?: string;
  @Field({ nullable: true })
  readonly children_uid_5?: string;
  @Field({ nullable: true })
  readonly children_uid_6?: string;
  @Field({ nullable: true })
  readonly children_uid_7?: string;
  @Field({ nullable: true })
  readonly children_uid_8?: string;
  @Field({ nullable: true })
  readonly children_uid_9?: string;
  @Field({ nullable: true })
  readonly children_uid_10?: string;
}
@InputType()
export class UpdateSiteV3 extends OmitType(CreateSiteV3, ['client'] as const) {}

@InputType()
export class AddChildrenV3 {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
  @Field()
  readonly type: string;
  @Field({ nullable: true })
  readonly children_uid_0?: string;
  @Field({ nullable: true })
  readonly children_uid_1?: string;
  @Field({ nullable: true })
  readonly children_uid_2?: string;
  @Field({ nullable: true })
  readonly children_uid_3?: string;
  @Field({ nullable: true })
  readonly children_uid_4?: string;
  @Field({ nullable: true })
  readonly children_uid_5?: string;
  @Field({ nullable: true })
  readonly children_uid_6?: string;
  @Field({ nullable: true })
  readonly children_uid_7?: string;
  @Field({ nullable: true })
  readonly children_uid_8?: string;
  @Field({ nullable: true })
  readonly children_uid_9?: string;
  @Field({ nullable: true })
  readonly children_uid_10?: string;
}

@InputType()
export class UpdateChildrenV3 {
  @Field({ nullable: true })
  readonly name?: string;
  @Field({ nullable: true })
  readonly description?: string;
  @Field({ nullable: true })
  readonly icon?: string;
  @Field({ nullable: true })
  readonly src?: string;
  @Field({ nullable: true })
  readonly alt?: string;
  @Field({ nullable: true })
  readonly type?: string;
  @Field({ nullable: true })
  readonly children_uid_0?: string;
  @Field({ nullable: true })
  readonly children_uid_1?: string;
  @Field({ nullable: true })
  readonly children_uid_2?: string;
  @Field({ nullable: true })
  readonly children_uid_3?: string;
  @Field({ nullable: true })
  readonly children_uid_4?: string;
  @Field({ nullable: true })
  readonly children_uid_5?: string;
  @Field({ nullable: true })
  readonly children_uid_6?: string;
  @Field({ nullable: true })
  readonly children_uid_7?: string;
  @Field({ nullable: true })
  readonly children_uid_8?: string;
  @Field({ nullable: true })
  readonly children_uid_9?: string;
  @Field({ nullable: true })
  readonly children_uid_10?: string;
}
@InputType()
export class DeleteChildrenV3 {
  @Field({ nullable: true })
  readonly children_uid_0?: string;
  @Field({ nullable: true })
  readonly children_uid_1?: string;
  @Field({ nullable: true })
  readonly children_uid_2?: string;
  @Field({ nullable: true })
  readonly children_uid_3?: string;
  @Field({ nullable: true })
  readonly children_uid_4?: string;
  @Field({ nullable: true })
  readonly children_uid_5?: string;
  @Field({ nullable: true })
  readonly children_uid_6?: string;
  @Field({ nullable: true })
  readonly children_uid_7?: string;
  @Field({ nullable: true })
  readonly children_uid_8?: string;
  @Field({ nullable: true })
  readonly children_uid_9?: string;
  @Field({ nullable: true })
  readonly children_uid_10?: string;
}

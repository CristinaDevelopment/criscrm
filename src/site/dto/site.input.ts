import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateSite {
  @Field()
  readonly name: string;
  @Field()
  readonly domain: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field()
  readonly client: string;
  @Field()
  readonly change: string;
  @Field()
  readonly uid: string;
}

@InputType()
export class UpdateSite extends OmitType(CreateSite, ['client'] as const) {}

@InputType()
export class UpdateDataBase {
  @Field()
  readonly type: string;
}

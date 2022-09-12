import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreatePage {
  @Field()
  readonly title: string;
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
  @Field()
  readonly page: string;
  @Field()
  readonly site: string;
}
@InputType()
export class UpdatePage extends OmitType(CreatePage, [
  'site',
  'page',
] as const) {}

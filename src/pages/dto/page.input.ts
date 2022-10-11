import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class CreatePage {
  @Field()
  
  readonly title: string;
  @Field()
  readonly description: string;
  @Field()
  readonly type: string;
  @Field()
  readonly parent: string;
  @Field()
  readonly site: string;
}
@InputType()
export class UpdatePage extends OmitType(CreatePage, [

] as const) {}

import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetSiteArgs {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}
@ArgsType()
export class GetChildren {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
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
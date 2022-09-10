import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetProductArgs {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  _id: string;
}


@ArgsType()
export class GetRouteArgs {
  @Field()
  route: string;
}
@ArgsType()
export class GetSiteArgs {
  @Field()
  site: string;
}


@ArgsType()
export class GetClothingArgs extends GetProductArgs {}
@ArgsType()
export class GetFurnitureArgs extends GetProductArgs {}
@ArgsType()
export class GetHomeApplianceArgs extends GetProductArgs {}
@ArgsType()
export class GetHardwareArgs extends GetProductArgs {}
@ArgsType()
export class GetWearArgs extends GetProductArgs {}
@ArgsType()
export class GetGiftArgs extends GetProductArgs {}
@ArgsType()
export class GetJewelerArgs extends GetProductArgs {}
@ArgsType()
export class GetTeddyArgs extends GetProductArgs {}

import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetProductArgs {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}


@ArgsType()
export class GetSite {
  @Field()
  siteId: string;
}
@ArgsType()
export class GetParent {
  @Field()
  parentId: string;
}


// @ArgsType()
// export class GetClothingArgs extends GetProductArgs {}
// @ArgsType()
// export class GetFurnitureArgs extends GetProductArgs {}
// @ArgsType()
// export class GetHomeApplianceArgs extends GetProductArgs {}
// @ArgsType()
// export class GetHardwareArgs extends GetProductArgs {}
// @ArgsType()
// export class GetGiftArgs extends GetProductArgs {}
// @ArgsType()
// export class GetJewelerArgs extends GetProductArgs {}
// @ArgsType()
// export class GetTeddyArgs extends GetProductArgs {}

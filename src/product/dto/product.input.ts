import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  readonly name: string;

  @Field()
  readonly mark: string;

  @Field()
  readonly description: string;

  @Field()
  readonly featured: string;

  @Field()
  readonly inStock: number;

  @Field()
  readonly price: number;

  @Field()
  readonly discountPrice: number;

  @Field()
  readonly site: string;
  @Field()
  readonly page: string;

}

@InputType()
export class UpdateProductInput extends OmitType(CreateProductInput, [
  'site',
  'page',
] as const) {}

@InputType()
export class UpdateSpecsInput {
  @Field()
  readonly text: string;
}

@InputType()
export class UpdateImagesInput {
  @Field()
  readonly src: string;
  @Field()
  readonly alt: string;
}
@InputType()
export class UpdateDetailsInput {
  @Field()
  readonly material: string;
  @Field()
  readonly color: string;
  @Field()
  readonly finishing: string;
  @Field()
  readonly logo: string;
  @Field()
  readonly accessories: string;
  @Field(() => [String])
  readonly dimensions: string[];
}

@InputType()
export class UpdateTagsInput extends PartialType(UpdateSpecsInput) {}

//TODO: articleType

@InputType()
export class AddColorsInput {
  @Field()
  readonly name: string;
  @Field()
  readonly class: string;
  @Field()
  readonly selectedClass: string;
}
@InputType()
export class UpdateColorsInput extends PartialType(AddColorsInput) {
  @Field(() => ID)
  readonly id: string;
}
@InputType()
export class RemoveColorsInput extends OmitType(UpdateColorsInput, [
  'name',
  'class',
  'selectedClass',
]) {}

@InputType()
export class AddSizesInput {
  @Field()
  readonly name: string;
  @Field()
  readonly inStock: number;
}

@InputType()
export class UpdateSizesInput extends PartialType(AddSizesInput) {
  @Field(() => ID)
  readonly id: string;
}

@InputType()
export class RemoveSizesInput extends OmitType(UpdateSizesInput, [
  'name',
  'inStock',
]) {}

@InputType()
export class SearchInput {
  @Field({ nullable: true })
  readonly title: string;
}
@InputType()
export class ProductInput {
  @Field({ nullable: true })
  readonly name: string;
  @Field({ nullable: true })
  readonly category: string;
  @Field({ nullable: true })
  readonly status: boolean;
  @Field({ nullable: true })
  readonly site: string;
}

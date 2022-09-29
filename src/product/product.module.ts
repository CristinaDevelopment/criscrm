import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Backpack,
  Clothing,
  Furniture,
  Handbag,
} from './entities/product.model';
import { ClothingSchema, FurnitureSchema } from './entities/product.schema';
import { ProductRepositoryBackpack } from './product.repository';
import {
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
  ProductRepositoryHandbag,
} from './product.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Clothing.name, schema: ClothingSchema },
        { name: Backpack.name, schema: ClothingSchema },
        { name: Handbag.name, schema: ClothingSchema },
      ],
      'wearsDB',
    ),
    MongooseModule.forFeature(
      [{ name: Furniture.name, schema: FurnitureSchema }],
      'productsDB',
    ),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepositoryClothing,
    ProductRepositoryHandbag,
    ProductRepositoryBackpack,
    ProductRepositoryFurniture,
  ],
  exports: [ProductService],
})
export class ProductModule {}

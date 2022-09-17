import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Clothing, Furniture } from './entities/product.model';
import { ClothingSchema, FurnitureSchema } from './entities/product.schema';
import {
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
} from './product.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Clothing.name, schema: ClothingSchema },
        { name: Furniture.name, schema: FurnitureSchema },
      ],
      'productsDB',
    ),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepositoryClothing,
    ProductRepositoryFurniture,
  ],
  exports: [ProductService],
})
export class ProductModule {}

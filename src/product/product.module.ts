import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Backpack,
  Clothing,
  Engine,
  Furniture,
  Glasses,
  Handbag,
} from './entities/product.model';
import {
  ClothingSchema,
  EngineSchema,
  FurnitureSchema,
  GlassesSchema,
  HardwareStoreSchema,
} from './entities/product.schema';
import {
  ProductRepositoryBackpack,
  ProductRepositoryEngine,
  ProductRepositoryGlasses,
  ProductRepositoryHardwareStore,
} from './product.repository';
import { HardwareStore } from './entities/product.model';
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
    MongooseModule.forFeature(
      [{ name: HardwareStore.name, schema: HardwareStoreSchema }],
      'toolsDB',
    ),
    MongooseModule.forFeature(
      [{ name: Glasses.name, schema: GlassesSchema }],
      'glassesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Engine.name, schema: EngineSchema }],
      'enginiesDB',
    ),
  ],
  providers: [
    ProductResolver,
    ProductService,
    ProductRepositoryClothing,
    ProductRepositoryHandbag,
    ProductRepositoryBackpack,
    ProductRepositoryFurniture,
    ProductRepositoryHardwareStore,
    ProductRepositoryGlasses,
    ProductRepositoryEngine,
  ],
  exports: [ProductService],
})
export class ProductModule {}

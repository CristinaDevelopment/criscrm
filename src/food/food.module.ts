import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food } from './entities/food.model';
import { FoodSchema } from './entities/food.schema';
import { FoodRepository } from './food.repository';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Food.name, schema: FoodSchema }],
      'foodsDB',
    ),
  ],
  providers: [FoodResolver, FoodService, FoodRepository],
  exports: [FoodService],
})
export class FoodModule {}

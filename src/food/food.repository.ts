import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryFood } from 'src/common/abstract';
import { Food } from './entities/food.model';
import { FoodDocument } from './entities/food.schema';

@Injectable()
export class FoodRepository extends AbstractRepositoryFood<FoodDocument> {
  protected readonly logger = new Logger(FoodRepository.name);
  constructor(
    @InjectModel(Food.name, 'foodsDB')
    foodModel: Model<FoodDocument>,
  ) {
    super(foodModel);
  }
}
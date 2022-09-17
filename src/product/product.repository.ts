import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Clothing, Furniture } from './entities/product.model';
import { ProductDocument } from './entities/product.schema';

@Injectable()
export class ProductRepositoryClothing extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryClothing.name);
  constructor(
    @InjectModel(Clothing.name, 'productsDB')
    productModelClothing: Model<ProductDocument>,
  ) {
    super(productModelClothing);
  }
}
@Injectable()
export class ProductRepositoryFurniture extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryFurniture.name);
  constructor(
    @InjectModel(Furniture.name, 'productsDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}

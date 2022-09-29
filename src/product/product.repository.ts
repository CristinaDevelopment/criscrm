import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Backpack, Clothing, Furniture, Handbag } from './entities/product.model';
import { ProductDocument } from './entities/product.schema';

@Injectable()
export class ProductRepositoryClothing extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryClothing.name);
  constructor(
    @InjectModel(Clothing.name, 'wearsDB')
    productModelClothing: Model<ProductDocument>,
  ) {
    super(productModelClothing);
  }
}
@Injectable()
export class ProductRepositoryBackpack extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryBackpack.name);
  constructor(
    @InjectModel(Backpack.name, 'wearsDB')
    productModelBackpack: Model<ProductDocument>,
  ) {
    super(productModelBackpack);
  }
}
@Injectable()
export class ProductRepositoryHandbag extends AbstractRepository<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryHandbag.name);
  constructor(
    @InjectModel(Handbag.name, 'wearsDB')
    productModelHandbag: Model<ProductDocument>,
  ) {
    super(productModelHandbag);
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

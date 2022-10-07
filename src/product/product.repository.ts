import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryProduct } from 'src/common/abstract';
import {
  Backpack,
  Clothing,
  Engine,
  Furniture,
  Glasses,
  Handbag,
  HardwareStore,
} from './entities/product.model';
import { ProductDocument } from './entities/product.schema';

@Injectable()
export class ProductRepositoryClothing extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryClothing.name);
  constructor(
    @InjectModel(Clothing.name, 'wearsDB')
    productModelClothing: Model<ProductDocument>,
  ) {
    super(productModelClothing);
  }
}
@Injectable()
export class ProductRepositoryBackpack extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryBackpack.name);
  constructor(
    @InjectModel(Backpack.name, 'wearsDB')
    productModelBackpack: Model<ProductDocument>,
  ) {
    super(productModelBackpack);
  }
}
@Injectable()
export class ProductRepositoryHandbag extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryHandbag.name);
  constructor(
    @InjectModel(Handbag.name, 'wearsDB')
    productModelHandbag: Model<ProductDocument>,
  ) {
    super(productModelHandbag);
  }
}
@Injectable()
export class ProductRepositoryFurniture extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryFurniture.name);
  constructor(
    @InjectModel(Furniture.name, 'furnituriesDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
@Injectable()
export class ProductRepositoryHardwareStore extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryHardwareStore.name);
  constructor(
    @InjectModel(HardwareStore.name, 'toolsDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
@Injectable()
export class ProductRepositoryGlasses extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryGlasses.name);
  constructor(
    @InjectModel(Glasses.name, 'glassesDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}
@Injectable()
export class ProductRepositoryEngine extends AbstractRepositoryProduct<ProductDocument> {
  protected readonly logger = new Logger(ProductRepositoryEngine.name);
  constructor(
    @InjectModel(Engine.name, 'enginiesDB')
    productModel: Model<ProductDocument>,
  ) {
    super(productModel);
  }
}

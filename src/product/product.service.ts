import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/product.input';
import { ProductDocument } from './entities/product.schema';
import {
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
} from './product.repository';
import { GetProductArgs, GetSiteArgs } from './dto/product.args';
import { capitalizar, slug } from 'src/utils/function';
import { uuidv3 } from 'src/utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepositoryClothing: ProductRepositoryClothing,
    private readonly productRepositoryFurniture: ProductRepositoryFurniture,
  ) {}

  async createProduct(input: CreateProductInput, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.create(this.product(input));
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.create(this.product(input));
    }
    return this.toModel(data);
  }

  async getProduct(id: GetProductArgs, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOne(id);
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOne(id);
    }
    return this.toModel(data);
  }
  async getProducts(site: GetSiteArgs, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find(site);
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find(site);
    }
    return data;
  }

  async deleteProduct(id: GetProductArgs, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteOne(id);
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne(id);
    }
    return 'deleted product';
  }
  async deleteProducts(site: GetSiteArgs, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteMany(site);
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne(site);
    }
    return 'deleted products';
  }

  findBySiteId(siteId: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({ site: siteId });
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({ site: siteId });
    }
    return data;
  }

  findByChildrenUid(childrenUid) {
    return this.productRepositoryClothing.find({
      children: childrenUid,
    });
  }

  private product(input: CreateProductInput) {
    return {
      article: {
        name: capitalizar(input.name),
        slug: slug(input.name),
        mark: input.mark,
        inStock: input.inStock,
        price: input.price,
        discountPrice: input.discountPrice,
        description: input.description,
        featured: {
          name: capitalizar(input.featured),
          href: slug(input.featured),
        },
        route: input.route,
        seo: {
          name: capitalizar(input.name),
          href: slug(input.name),
          description: input.description,
          image: {
            uid: uuidv3(),
            src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
            alt: 'image description',
          },
        },
      },
      site: input.site,
      children: input.children,
    };
  }

  private toModel(productDocument: ProductDocument) {
    return {
      _id: productDocument._id.toHexString(),
      article: productDocument.article,
      site: productDocument.site,
      children: productDocument.children,
    };
  }
}

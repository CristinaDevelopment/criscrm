import { Injectable } from '@nestjs/common';
import { CreateProduct, UpdateProduct } from './dto/product.input';
import { ProductDocument } from './entities/product.schema';
import {
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
} from './product.repository';
import { GetPage, GetProductArgs, GetSite } from './dto/product.args';
import { capitalizar, slug } from 'src/utils/function';
import { uuidv3 } from 'src/utils';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepositoryClothing: ProductRepositoryClothing,
    private readonly productRepositoryFurniture: ProductRepositoryFurniture,
  ) {}

  async createProduct(input: CreateProduct, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.create(
        this.productCreated(input),
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.create(
        this.productCreated(input),
      );
    }
    return this.toModel(data);
  }
  async updateProduct(id: GetProductArgs, input: UpdateProduct, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOneAndUpdate(id, {
        $set: this.productUpdated(input),
        $push: { 'updateDate.register': { updatedAt: new Date() } },

      });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOneAndUpdate(id, {
        $set: this.productUpdated(input),
        $push: { 'updateDate.register': { updatedAt: new Date() } },

      });
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

  async getProductsBySite(site: GetSite, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find(site);
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find(site);
    }
    return data;
  }
  async getProductsByPage(page: GetPage, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find(page);
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find(page);
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

  async deleteProducts(site: GetSite, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteMany(site);
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne(site);
    }
    return 'deleted products';
  }

  findByPageUid(pageUi: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({ page: pageUi });
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({ page: pageUi });
    } else {
      data = [];
    }
    return data;
  }

  findByPageClothing(pageUi) {
    return this.productRepositoryClothing.find({ page: pageUi });
  }
  findByPageFurniture(pageUi) {
    return this.productRepositoryFurniture.find({ page: pageUi });
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

  all(pagination: ListInput, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.All(pagination);
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.All(pagination);
    }
    return data;
  }

  private productCreated(input: CreateProduct) {
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
        // route: input.route,
        seo: {
          title: capitalizar(input.name),
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
      page: input.page,
      updateDate: {
        createdAt: new Date(),
      },
    };
  }
  private productUpdated(input: UpdateProduct) {
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
        seo: {
          title: capitalizar(input.name),
          href: slug(input.name),
          description: input.description,
          image: {
            uid: uuidv3(),
            src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
            alt: 'image description',
          },
        },
      },
    };
  }

  private toModel(productDocument: ProductDocument) {
    return {
      _id: productDocument._id.toHexString(),
      article: productDocument.article,
      site: productDocument.site,
      page: productDocument.page,
      updateDate: productDocument.updateDate,
    };
  }
}

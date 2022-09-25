import { Injectable } from '@nestjs/common';
import { CreateProduct, UpdateImage, UpdateProduct } from './dto/product.input';
import { ProductDocument } from './entities/product.schema';
import {
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
} from './product.repository';
import { GetParent, GetProductArgs, GetSite } from './dto/product.args';
import { capitalizar, slug } from 'src/utils/function';
import { uuidv3 } from 'src/utils';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepositoryClothing: ProductRepositoryClothing,
    private readonly productRepositoryFurniture: ProductRepositoryFurniture,
  ) {}

  async create(input: CreateProduct, type: string) {
    await this.validateSlugCreate(type, input);
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.create(
        this.productCreated(input, type),
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.create(
        this.productCreated(input, type),
      );
    }
    return this.toModel(data);
  }
  async update({ id }: GetProductArgs, input: UpdateProduct, type: string) {
    await this.validateSlugUpdate(id, type, input);
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOneAndUpdate(
        { _id: id },
        {
          $set: this.productUpdated(input),
          $push: { 'updateDate.register': { updatedAt: new Date() } },
        },
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOneAndUpdate(
        { _id: id },
        {
          $set: this.productUpdated(input),
          $push: { 'updateDate.register': { updatedAt: new Date() } },
        },
      );
    }
    return this.toModel(data);
  }
  async updateImage(
    { id }: GetProductArgs,
    input: UpdateImage[],
    type: string,
  ) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            'data.image': input.map((data) => ({
              uid: uuidv3(),
              src: data.src,
              alt: data.alt,
            })),
          },
          $push: { 'updateDate.register': { updatedAt: new Date() } },
        },
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            'data.image': input.map((data) => ({
              uid: uuidv3(),
              src: data.src,
              alt: data.alt,
            })),
          },
          $push: { 'updateDate.register': { updatedAt: new Date() } },
        },
      );
    }
    return this.toModel(data);
  }

  async findProduct({ id }: GetProductArgs, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOne({ _id: id });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOne({ _id: id });
    }
    return this.toModel(data);
  }
  findProducts(type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({});
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({});
    }
    return data;
  }
  findProductsClothing() {
    return this.productRepositoryClothing.find({});
  }
  findProductsFurniture() {
    return this.productRepositoryFurniture.find({});
  }

  async findAllProducts() {
    const clothings = await this.productRepositoryClothing.find({});
    const furnituries = await this.productRepositoryFurniture.find({});

    return [clothings, furnituries].flat(1);
  }

  async findProductsBySite({ siteId }: GetSite, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find({ site: siteId });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find({ site: siteId });
    }
    return data;
  }
  async findProductsByParent({ parentId }: GetParent, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find({ parent: parentId });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find({ parent: parentId });
    }
    return data;
  }

  async deleteProduct({ id }: GetProductArgs, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteOne({ _id: id });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne({ _id: id });
    }
    return id;
  }

  async deleteProducts({ siteId }: GetSite, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteMany({ site: siteId });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne({ site: siteId });
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
  findByParentUid(parentUi: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({ parent: parentUi });
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({ parent: parentUi });
    } else {
      data = [];
    }
    return data;
  }

  findByParentClothing(pageUi) {
    return this.productRepositoryClothing.find({ parent: pageUi });
  }
  findByParentFurniture(pageUi) {
    return this.productRepositoryFurniture.find({ parent: pageUi });
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

  all(pagination: ListInput, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.All(pagination);
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.All(pagination);
    }
    return data;
  }

  private async validateSlugCreate(
    type: string,
    { name, site, parent }: CreateProduct,
  ) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.findOneBySlug({
        'data.slug': slug(name),
        site: site,
        parent: parent,
      });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.findOneBySlug({
        'data.slug': slug(name),
        site: site,
        parent: parent,
      });
    }
  }
  private async validateSlugUpdate(
    id: string,
    type: string,
    { name, site, parent }: UpdateProduct,
  ) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.findOneBySlug({
        _id: { $ne: id },
        'data.slug': slug(name),
        site: site,
        parent: parent,
      });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.findOneBySlug({
        _id: { $ne: id },
        'data.slug': slug(name),
        site: site,
        parent: parent,
      });
    }
  }

  private productCreated(
    {
      name,
      mark,
      inStock,
      price,
      discountPrice,
      description,
      featured,
      site,
      parent,
    }: CreateProduct,
    type: string,
  ) {
    return {
      data: {
        name: capitalizar(name),
        slug: slug(name),
        mark: mark,
        inStock: inStock,
        price: price,
        discountPrice: discountPrice,
        description: description,
        featured: {
          name: capitalizar(featured),
          href: slug(featured),
        },
        image: [],
        seo: {
          title: capitalizar(name),
          href: slug(name),
          description: description,
          image: {
            uid: uuidv3(),
            src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
            alt: 'image description',
          },
        },
      },
      site: site,
      parent: parent,
      type: type === 'clothing' ? 'clothing' : 'furniture',
      updateDate: {
        createdAt: new Date(),
      },
    };
  }
  private productUpdated({
    name,
    mark,
    inStock,
    price,
    discountPrice,
    description,
    featured,
  }: UpdateProduct) {
    return {
      'data.name': capitalizar(name),
      'data.slug': slug(name),
      'data.mark': mark,
      'data.inStock': inStock,
      'data.price': price,
      'data.discountPrice': discountPrice,
      'data.description': description,
      'data.featured': {
        name: capitalizar(featured),
        href: slug(featured),
      },
      'data.seo': {
        title: capitalizar(name),
        href: slug(name),
        description: description,
        image: {
          uid: uuidv3(),
          src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
          alt: 'image description',
        },
      },
    };
  }

  private toModel(productDocument: ProductDocument) {
    return {
      _id: productDocument._id.toHexString(),
      data: productDocument.data,
      site: productDocument.site,
      parent: productDocument.parent,
      type: productDocument.type,
      updateDate: productDocument.updateDate,
    };
  }
}

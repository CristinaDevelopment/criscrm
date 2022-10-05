import { Injectable } from '@nestjs/common';
import { CreateProduct, UpdateImage, UpdateProduct } from './dto/product.input';
import { ProductDocument } from './entities/product.schema';
import {
  ProductRepositoryBackpack,
  ProductRepositoryClothing,
  ProductRepositoryFurniture,
  ProductRepositoryGlasses,
  ProductRepositoryHandbag,
  ProductRepositoryHardwareStore,
} from './product.repository';
import { GetProductArgs, GetSite } from './dto/product.args';
import { capitalizar, slug } from 'src/utils/function';
import { uuidv3 } from 'src/utils';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepositoryClothing: ProductRepositoryClothing,
    private readonly productRepositoryBackpack: ProductRepositoryBackpack,
    private readonly productRepositoryHandbag: ProductRepositoryHandbag,
    private readonly productRepositoryFurniture: ProductRepositoryFurniture,
    private readonly productRepositoryHardwareStore: ProductRepositoryHardwareStore,
    private readonly productRepositoryGlasses: ProductRepositoryGlasses,
  ) {}

  async create(input: CreateProduct, type: string) {
    await this.validateSlugCreate(type, input);
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.create(
        this.productCreated(input, type),
      );
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.create(
        this.productCreated(input, type),
      );
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.create(
        this.productCreated(input, type),
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.create(
        this.productCreated(input, type),
      );
    } else if (type === 'hardware-store') {
      data = await this.productRepositoryHardwareStore.create(
        this.productCreated(input, type),
      );
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.create(
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
        this.productUpdated(input),
      );
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.findOneAndUpdate(
        { _id: id },
        this.productUpdated(input),
      );
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.findOneAndUpdate(
        { _id: id },
        this.productUpdated(input),
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOneAndUpdate(
        { _id: id },
        this.productUpdated(input),
      );
    } else if (type === 'harware-store') {
      data = await this.productRepositoryHardwareStore.findOneAndUpdate(
        { _id: id },
        this.productUpdated(input),
      );
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.findOneAndUpdate(
        { _id: id },
        this.productUpdated(input),
      );
    }
    return this.toModel(data);
  }

  async updateImage(
    { id }: GetProductArgs,
    input: UpdateImage[],
    type: string,
    uid: string,
  ) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    } else if (type === 'hardware-store') {
      data = await this.productRepositoryHardwareStore.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.findOneAndUpdate(
        { _id: id },
        this.productImage(input, uid),
      );
    }

    return this.toModel(data);
  }

  async findProduct({ id }: GetProductArgs, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.findOne({ _id: id });
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.findOne({ _id: id });
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.findOne({ _id: id });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.findOne({ _id: id });
    } else if (type === 'hardware-store') {
      data = await this.productRepositoryHardwareStore.findOne({ _id: id });
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.findOne({ _id: id });
    }
    return this.toModel(data);
  }

  findProducts(type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({});
    } else if (type === 'handbag') {
      data = this.productRepositoryHandbag.find({});
    } else if (type === 'backpack') {
      data = this.productRepositoryBackpack.find({});
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({});
    } else if (type === 'hardware-store') {
      data = this.productRepositoryHardwareStore.find({});
    } else if (type === 'glasses') {
      data = this.productRepositoryGlasses.find({});
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
    const handbags = await this.productRepositoryHandbag.find({});
    const backpacks = await this.productRepositoryBackpack.find({});
    const furnituries = await this.productRepositoryFurniture.find({});
    const hardwareStore = await this.productRepositoryHardwareStore.find({});
    const glasses = await this.productRepositoryGlasses.find({});

    return [
      ...clothings,
      ...furnituries,
      ...handbags,
      ...backpacks,
      ...hardwareStore,
      ...glasses,
    ];
  }

  async findProductsBySite({ siteId }: GetSite, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find({ site: siteId });
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.find({ site: siteId });
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.find({ site: siteId });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find({ site: siteId });
    } else if (type === 'hardware-store') {
      data = await this.productRepositoryHardwareStore.find({ site: siteId });
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.find({ site: siteId });
    }
    return data;
  }
  async findProductsByParent(parentId: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = await this.productRepositoryClothing.find({ parent: parentId });
    } else if (type === 'handbag') {
      data = await this.productRepositoryHandbag.find({ parent: parentId });
    } else if (type === 'backpack') {
      data = await this.productRepositoryBackpack.find({ parent: parentId });
    } else if (type === 'furniture') {
      data = await this.productRepositoryFurniture.find({ parent: parentId });
    } else if (type === 'hardware-store') {
      data = await this.productRepositoryHardwareStore.find({
        parent: parentId,
      });
    } else if (type === 'glasses') {
      data = await this.productRepositoryGlasses.find({ parent: parentId });
    }
    return data;
  }
  async findAllProductsByParent(parentId: string) {
    const clothings = await this.productRepositoryClothing.find({
      parent: parentId,
    });
    const handbags = await this.productRepositoryHandbag.find({
      parent: parentId,
    });
    const backpacks = await this.productRepositoryBackpack.find({
      parent: parentId,
    });
    const hardwareStores = await this.productRepositoryHardwareStore.find({
      parent: parentId,
    });
    const glasses = await this.productRepositoryGlasses.find({
      parent: parentId,
    });
    // const furnituries = await this.productRepositoryFurniture.find({ parent: parentId });

    return [
      ...clothings,
      ...handbags,
      ...backpacks,
      ...hardwareStores,
      ...glasses,
    ];
  }

  async deleteProduct({ id }: GetProductArgs, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteOne({ _id: id });
    } else if (type === 'handbag') {
      await this.productRepositoryHandbag.deleteOne({ _id: id });
    } else if (type === 'backpack') {
      await this.productRepositoryBackpack.deleteOne({ _id: id });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne({ _id: id });
    } else if (type === 'hardware-store') {
      await this.productRepositoryHardwareStore.deleteOne({ _id: id });
    } else if (type === 'glasses') {
      await this.productRepositoryGlasses.deleteOne({ _id: id });
    }
    return id;
  }

  async deleteProducts({ siteId }: GetSite, type: string) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.deleteMany({ site: siteId });
    } else if (type === 'handbag') {
      await this.productRepositoryHandbag.deleteOne({ site: siteId });
    } else if (type === 'backpack') {
      await this.productRepositoryBackpack.deleteOne({ site: siteId });
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.deleteOne({ site: siteId });
    } else if (type === 'hardware-store') {
      await this.productRepositoryHardwareStore.deleteOne({ site: siteId });
    } else if (type === 'glasses') {
      await this.productRepositoryGlasses.deleteOne({ site: siteId });
    }
    return 'deleted products';
  }

  findByParentId(parentUi: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({ parent: parentUi });
    } else if (type === 'handbag') {
      data = this.productRepositoryHandbag.find({ parent: parentUi });
    } else if (type === 'backpack') {
      data = this.productRepositoryBackpack.find({ parent: parentUi });
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({ parent: parentUi });
    } else if (type === 'hardware-store') {
      data = this.productRepositoryHardwareStore.find({ parent: parentUi });
    } else if (type === 'glasses') {
      data = this.productRepositoryGlasses.find({ parent: parentUi });
    } else {
      data = [];
    }
    return data;
  }

  findByParentClothing(pageUi) {
    return this.productRepositoryClothing.find({ parent: pageUi });
  }
  findByParentHandbag(pageUi) {
    return this.productRepositoryHandbag.find({ parent: pageUi });
  }
  findByParentBackpack(pageUi) {
    return this.productRepositoryBackpack.find({ parent: pageUi });
  }
  findByParentFurniture(pageUi) {
    return this.productRepositoryFurniture.find({ parent: pageUi });
  }
  findByParentHardwareStore(pageUi) {
    return this.productRepositoryHardwareStore.find({ parent: pageUi });
  }
  findByParentGlasses(pageUi) {
    return this.productRepositoryGlasses.find({ parent: pageUi });
  }

  findBySiteId(siteId: string, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.find({ site: siteId });
    } else if (type === 'handbag') {
      data = this.productRepositoryHandbag.find({ site: siteId });
    } else if (type === 'backpack') {
      data = this.productRepositoryBackpack.find({ site: siteId });
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.find({ site: siteId });
    } else if (type === 'hardware-store') {
      data = this.productRepositoryHardwareStore.find({ site: siteId });
    } else if (type === 'glasses') {
      data = this.productRepositoryGlasses.find({ site: siteId });
    }
    return data;
  }

  all(pagination: ListInput, type: string) {
    let data;
    if (type === 'clothing') {
      data = this.productRepositoryClothing.All(pagination);
    } else if (type === 'handbag') {
      data = this.productRepositoryHandbag.All(pagination);
    } else if (type === 'backpack') {
      data = this.productRepositoryBackpack.All(pagination);
    } else if (type === 'furniture') {
      data = this.productRepositoryFurniture.All(pagination);
    } else if (type === 'hardware-store') {
      data = this.productRepositoryHardwareStore.All(pagination);
    } else if (type === 'glasses') {
      data = this.productRepositoryGlasses.All(pagination);
    }
    return data;
  }

  private async validateSlugCreate(type: string, input: CreateProduct) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.findOneBySlug(
        this.slugValidCreated(input),
      );
    } else if (type === 'handbag') {
      await this.productRepositoryHandbag.findOneBySlug(
        this.slugValidCreated(input),
      );
    } else if (type === 'backpack') {
      await this.productRepositoryBackpack.findOneBySlug(
        this.slugValidCreated(input),
      );
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.findOneBySlug(
        this.slugValidCreated(input),
      );
    } else if (type === 'hardware-store') {
      await this.productRepositoryHardwareStore.findOneBySlug(
        this.slugValidCreated(input),
      );
    } else if (type === 'glasses') {
      await this.productRepositoryGlasses.findOneBySlug(
        this.slugValidCreated(input),
      );
    }
  }
  private async validateSlugUpdate(
    id: string,
    type: string,
    input: UpdateProduct,
  ) {
    if (type === 'clothing') {
      await this.productRepositoryClothing.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    } else if (type === 'handbag') {
      await this.productRepositoryHandbag.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    } else if (type === 'backpack') {
      await this.productRepositoryBackpack.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    } else if (type === 'furniture') {
      await this.productRepositoryFurniture.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    } else if (type === 'hardware-store') {
      await this.productRepositoryHardwareStore.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    } else if (type === 'glasses') {
      await this.productRepositoryGlasses.findOneBySlug(
        this.slugValidUpdated(input, id),
      );
    }
  }
  private slugValidCreated({ name, site, parent }: CreateProduct) {
    return {
      'data.slug': slug(name),
      site: site,
      parent: parent,
    };
  }
  private slugValidUpdated({ name, site, parent }: UpdateProduct, id: string) {
    return {
      _id: { $ne: id },
      'data.slug': slug(name),
      site: site,
      parent: parent,
    };
  }
  private productCreated(
    {
      name,
      mark,
      inStock,
      price,
      discountPrice,
      description,
      promotion,
      site,
      parent,
      uid,
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
        promotion: {
          name: capitalizar(promotion),
          href: slug(promotion),
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
      type: type,
      updateDate: {
        createdAt: new Date(),
        register: [
          {
            uid: uid,
            change: 'created',
            updatedAt: new Date(),
          },
        ],
      },
    };
  }
  private productImage(input: UpdateImage[], uid: string) {
    return {
      $set: {
        'data.image': input.map((data) => ({
          uid: uuidv3(),
          src: data.src,
          alt: data.alt,
        })),
        'data.seo.image.src': input[0].src,
        'data.seo.image.alt': input[0].alt,
      },
      $push: {
        'updateDate.register': {
          uid: uid,
          change: 'image update',
          updatedAt: new Date(),
        },
      },
    };
  }
  private productUpdated({
    uid,
    change,
    name,
    mark,
    inStock,
    price,
    discountPrice,
    description,
    promotion,
    details,
  }: UpdateProduct) {
    return {
      $set: {
        'data.name': capitalizar(name),
        'data.slug': slug(name),
        'data.mark': mark,
        'data.inStock': inStock,
        'data.price': price,
        'data.discountPrice': discountPrice,
        'data.description': description,
        'data.promotion': {
          name: capitalizar(promotion),
          href: slug(promotion),
        },
        'data.details': details,
        'data.seo.title': capitalizar(name),
        'data.seo.href': slug(name),
        'data.seo.description': description,
      },
      $push: {
        'updateDate.register': {
          uid: uid,
          change: change,
          updatedAt: new Date(),
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

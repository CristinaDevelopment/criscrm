import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { capitalizar, slug } from 'src/utils/function';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
import {
  CreateProduct,
  UpdateImage,
  UpdateProduct,
} from '../../product/dto/product.input';
import { uuidv3 } from 'src/utils';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      update,
      options,
    );
    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const document = await this.model.updateMany(
      { site: filterQuery.site },
      { $set: update },
    );
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteOne(filterQuery);
  }
  async deleteMany(filterQuery: FilterQuery<TDocument>) {
    return this.model.deleteMany(filterQuery);
  }

  findAll(paginationQuery: ListInput) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find()
      .sort({ 'updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput) {
    const count = await this.model.count();
    const data = await this.findAll(paginationQuery);
    return { data, count };
  }

  async findOneBySlug(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (document) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        'You already have an item registered with that name',
      );
    }
    return;
  }
  // async findOneBySlugExist({
  //   name,
  //   site,
  //   parent,
  // }: CreateProduct): Promise<TDocument> {
  //   const document = await this.model.findOne(
  //     { 'data.slug': slug(name), site: site, parent: parent },
  //     {},
  //     { lean: true },
  //   );

  //   if (document) {
  //     // this.logger.warn('Document not found with filterQuery', filterQuery);
  //     throw new UnprocessableEntityException(
  //       `You already have an item registered with that name: ${name}  `,
  //     );
  //   }
  //   return;
  // }

  async add(input: CreateProduct, type: string): Promise<TDocument> {
    const product = await this.model.findOne(
      {
        'data.slug': slug(input.name),
        site: input.site,
        parent: input.parent,
      },
      {},
      { lean: true },
    );

    if (product) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const createdDocument = new this.model(this.productCreated(input, type));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    id: string,
    input: UpdateProduct,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const product = await this.model.findOne(
      {
        _id: { $ne: id },
        'data.slug': slug(input.name),
        site: input.site,
        parent: input.parent,
      },
      {},
      { lean: true },
    );
    if (product) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.name}"`,
      );
    }
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.productUpdated(input),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
  async updateImage(
    id: string,
    input: UpdateImage[],
    uid: string,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.productImage(input, uid),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
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
      _id: new Types.ObjectId(),
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
        lastUpdatedAt: new Date(),
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
        'data.seo.title': capitalizar(name),
        'data.seo.href': slug(name),
        'data.seo.description': description,
        'updateAt.lastUpdatedAt': new Date(),
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
        'updateAt.lastUpdatedAt': new Date(),
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
}

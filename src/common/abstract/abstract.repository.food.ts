import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { capitalizar, slug } from 'src/utils/function';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
import { UpdateImage } from '../../product/dto/product.input';
import { uuidv3 } from 'src/utils';
import { CreateFood, UpdateFood } from 'src/food/dto';

export abstract class AbstractRepositoryFood<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

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
  async deleteManyFoods(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }

  findAll(paginationQuery: ListInput, siteId: string) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find({ site: siteId }, {}, { lean: true })
      .sort({ 'updateDate.lastUpdatedAt': -1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, siteId: string) {
    const count = await this.model.count();
    const data = await this.findAll(paginationQuery, siteId);
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

  async add(input: CreateFood, type: string): Promise<TDocument> {
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
    const createdDocument = new this.model(this.foodCreated(input, type));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    id: string,
    input: UpdateFood,
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
      this.foodUpdated(input),
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
      this.foodImage(input, uid),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  private foodCreated(
    {
      name,
      price,
      discountPrice,
      description,
      promotion,
      site,
      parent,
      uid,
    }: CreateFood,
    type: string,
  ) {
    return {
      _id: new Types.ObjectId(),
      data: {
        name: capitalizar(name),
        slug: slug(name),
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
  private foodUpdated({
    uid,
    change,
    name,
    price,
    discountPrice,
    description,
    prescription,
    preparation,
    promotion,
  }: UpdateFood) {
    return {
      $set: {
        'data.name': capitalizar(name),
        'data.slug': slug(name),
        'data.price': price,
        'data.discountPrice': discountPrice,
        'data.prescription': prescription,
        'data.preparation': preparation,
        'data.description': description,
        'data.promotion': {
          name: capitalizar(promotion),
          href: slug(promotion),
        },
        'data.seo.title': capitalizar(name),
        'data.seo.href': slug(name),
        'data.seo.description': description,
        'updateDate.lastUpdatedAt': new Date(),
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
  private foodImage(input: UpdateImage[], uid: string) {
    return {
      $set: {
        'data.image': input.map((data) => ({
          uid: uuidv3(),
          src: data.src,
          alt: data.alt,
        })),
        'data.seo.image.src': input[0].src,
        'data.seo.image.alt': input[0].alt,
        'updateDate.lastUpdatedAt': new Date(),
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

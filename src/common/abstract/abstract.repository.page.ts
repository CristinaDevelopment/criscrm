import {
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { ListInput } from '../pagination/dto/list.input';
import { AbstractDocument } from './abstract.schema';
import { CreatePage, UpdatePage } from '../../pages/dto/page.input';
import { capitalizar, slug } from 'src/utils/function';
import { UpdateImage } from 'src/product/dto/product.input';

export abstract class AbstractRepositoryPage<
  TDocument extends AbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }
  async add(input: CreatePage): Promise<TDocument> {
    const page = await this.model.findOne(
      {
        slug: slug(input.title),
        site: input.site,
        parent: input.parent,
      },
      {},
      { lean: true },
    );

    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const createdDocument = new this.model(this.pageCreated(input));
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async update(
    id: string,
    input: UpdatePage,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const page = await this.model.findOne(
      {
        _id: { $ne: id },
        slug: slug(input.title),
        site: input.site,
        parent: input.parent,
      },
      {},
      { lean: true },
    );
    if (page) {
      // this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new UnprocessableEntityException(
        `You already have an item registered with that name "${input.title}"`,
      );
    }
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.pageUpdate(input),
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
    input: UpdateImage,
    uid: string,
    options: Record<string, unknown> = { lean: true, new: true },
  ) {
    const document = await this.model.findOneAndUpdate(
      { _id: id },
      this.pageImage(input, uid),
      options,
    );
    if (!document) {
      // this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
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

  async deleteManyPages(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }
  async deleteManyPagesByParent(ids: string[]) {
    return this.model.deleteMany({ parent: { $in: ids }});
  }
  async deleteManyPagesByParentCron(ids: string[]) {
    return this.model.deleteMany({ parent: { $nin: ids }});
  }

  findAll(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const { limit, offset } = paginationQuery;
    return this.model
      .find(filterQuery, {}, { lean: true })
      .sort({ 'updateDate.createdAt': 1 })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async All(paginationQuery: ListInput, filterQuery: FilterQuery<TDocument>) {
    const count = await this.model.count();
    const data = await this.findAll(paginationQuery, filterQuery);
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
  private pageCreated({ type, title, description, parent, site }: CreatePage) {
    return {
      _id: new Types.ObjectId(),
      data: {
        type: type,
        seo: {
          title: capitalizar(title),
          href: slug(title) === 'home' ? '' : slug(title),
          description: description,
        },
      },
      parent: parent,
      site: site,
      updateDate: {
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
      },
      slug: slug(title),
      section: [],
    };
  }
  private pageUpdate({ type, title, description }: UpdatePage) {
    return {
      $set: {
        'data.type': type,
        'data.seo.title': capitalizar(title) ,
        'data.seo.href': slug(title),
        'data.seo.description': description,
        'updateData.lastUpdatedAt': new Date(),
        slug: slug(title),
      },
      $push: { 'updateDate.register': { updatedAt: new Date() } },
    };
  }
  private pageImage(input: UpdateImage, uid: string) {
    return {
      $set: {
        'data.seo.image.src': input.src,
        'data.seo.image.alt': input.alt,
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

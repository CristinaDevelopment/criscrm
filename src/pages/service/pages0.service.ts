import { Injectable } from '@nestjs/common';
import { slug } from 'src/utils/function';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { PageDocument } from '../entities/page.schema';
import {
  Pages0Repository,
  Pages1Repository,
} from '../repository/pages.repository';
import { capitalizar } from '../../utils/function';
import { GetPage, GetSite } from '../dto/page.args';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { Page0 } from '../entities/page.model';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class Pages0Service {
  constructor(private readonly pageRepository: Pages0Repository) {}
  async create(input: CreatePage) {
    const document = await this.pageRepository.create(this.pageCreated(input));
    return this.toModel(document);
  }
  async update({ id }: GetPage, input: UpdatePage) {
    const document = await this.pageRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: this.pageUpdate(input),
        $push: { 'updateDate.register': { updatedAt: new Date() } },
      },
    );
    return this.toModel(document);
  }

  async findPage({ id }: GetPage) {
    const document = await this.pageRepository.findOne({ _id: id });
    return this.toModel(document);
  }

  async findPageBySlug(site: string, slug: string) {
    const document = await this.pageRepository.findOne({
      site: site,
      slug: slug,
    });
    return this.toModel(document);
  }

  findPagesBySite({ siteID }: GetSite) {
    return this.pageRepository.find({ site: siteID });
  }

  findPages() {
    return this.pageRepository.find({});
  }

  async deletePage({ id }: GetPage) {
    await this.pageRepository.deleteOne({ _id: id });
    return id;
  }

  async deletePagesByParent(ids: string[]) {
    await this.pageRepository.deleteManyPagesByParent(ids);
    return ids;
  }

  async deletePagesByParentCron(ids: string[]) {
    await this.pageRepository.deleteManyPagesByParentCron(ids);
    return ids;
  }

  async deletePagesById(ids: string[]) {
    await this.pageRepository.deleteManyPages(ids);
    return ids;
  }

  findByParentId(parentId) {
    return this.pageRepository.find({ parent: parentId });
  }

  all(pagination: ListInput, parentId: string) {
    return this.pageRepository.All(pagination, { parent: parentId });
  }

  private pageCreated({ type, title, description, parent, site }: CreatePage) {
    return {
      data: {
        type: type,
        seo: {
          title: capitalizar(title),
          href: slug(title) === 'home' ? '' : slug(title),
          description: description,
          image: {
            src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
            alt: description,
          },
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
      data: {
        type: type,
        'seo.title': capitalizar(title),
        'seo.href': slug(title),
        'seo.description': description,
      },
      'updateData.lastUpdatedAt': new Date(),
      slug: slug(title),
    };
  }

  private toModel(pageDocument: PageDocument): Page0 {
    return {
      _id: pageDocument._id.toHexString(),
      data: pageDocument.data,
      site: pageDocument.site,
      parent: pageDocument.parent,
      slug: pageDocument.slug,
      updateDate: pageDocument.updateDate,
    };
  }
}

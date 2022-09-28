import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { capitalizar, slug } from 'src/utils/function';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page5 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';
import { Pages5Repository } from '../repository/pages.repository';

@Injectable()
export class Pages5Service {
  constructor(
    private readonly pageRepository: Pages5Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}
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
    // await this.validateSite(id);
    await this.pageRepository.deleteOne({ _id: id });
    return id;
  }

  findByParentId(parentId) {
    return this.pageRepository.find({ parent: parentId });
  }

  all(pagination: ListInput) {
    return this.pageRepository.All(pagination);
  }

  private pageCreated({
    type,
    title,
    description,
    src,
    alt,
    parent,
    site,
  }: CreatePage) {
    return {
      data: {
        type: type,
        seo: {
          title: capitalizar(title),
          href: slug(title) === 'home' ? '' : slug(title),
          description: description,
          image: {
            src: src,
            alt: alt,
          },
        },
      },
      parent: parent,
      site: site,
      updateDate: {
        createdAt: new Date(),
      },
      slug: slug(title),
      section: [],
    };
  }

  private pageUpdate({ type, title, description, src, alt }: UpdatePage) {
    return {
      data: {
        type: type,
        seo: {
          title: capitalizar(title),
          href: slug(title),
          description: description,
          image: {
            src: src,
            alt: alt,
          },
        },
      },

      slug: slug(title),
    };
  }

  private toModel(pageDocument: PageDocument): Page5 {
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

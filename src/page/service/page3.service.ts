import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { capitalizar, slug } from 'src/utils/function';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { PageDocument } from '../entities/page.schema';
import { Page3Repository } from '../repository/page.repository';

@Injectable()
export class Page3Service {
  constructor(
    private readonly pageRepository: Page3Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}
  async create(input: CreatePage) {
    const document = await this.pageRepository.create(this.pageCreated(input));
    return this.toModel(document);
  }

  async update(id: GetPage, input: UpdatePage) {
    const document = await this.pageRepository.findOneAndUpdate(id, {
      $set: this.pageUpdate(input),
    });
    return this.toModel(document);
  }

  async findPage(id: GetPage) {
    const document = await this.pageRepository.findOne(id);
    return this.toModel(document);
  }
  findPagesBySite(site: GetSite) {
    return this.pageRepository.find(site);
  }

  findPages() {
    return this.pageRepository.find({});
  }


  async deletePage(id: GetPage) {
    // await this.validateSite(id);
    await this.pageRepository.deleteOne(id);
    return 'delete page';
  }
  findPage3(pageId) {
    return this.pageRepository.find({ page: pageId });
  }

  all(pagination: ListInput) {
    return this.pageRepository.All(pagination);
  }

  private pageCreated(input: CreatePage) {
    return {
      data: {
        type: input.type,
        seo: {
          title: capitalizar(input.title),
          href: slug(input.title),
          description: input.description,
          image: {
            src: input.src,
            alt: input.alt,
          },
        },
      },
      page: input.page,
      site: input.site,
      updateDate: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      slug: slug(input.title),
      section: [],
    };
  }
  private pageUpdate(input: UpdatePage) {
    return {
      data: {
        type: input.type,
        seo: {
          title: capitalizar(input.title),
          href: slug(input.title),
          description: input.description,
          image: {
            src: input.src,
            alt: input.alt,
          },
        },
      },

      slug: slug(input.title),
      'updateDate.updatedAt': new Date(),
    }
  }

  private toModel(pageDocument: PageDocument) {
    return {
      _id: pageDocument._id.toHexString(),
      data: pageDocument.data,
      page: pageDocument.page,
      slug: pageDocument.slug,
    };
  }
}

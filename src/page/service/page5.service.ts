import { Injectable } from '@nestjs/common';
import { capitalizar, slug } from 'src/utils/function';
import { GetPage } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { PageDocument } from '../entities/page.schema';
import { Page5Repository } from '../repository/page.repository';

@Injectable()
export class Page5Service {
  constructor(
    private readonly pageRepository: Page5Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}
  async createPage(input: CreatePage) {
    const document = await this.pageRepository.create({
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
    });
    return this.toModel(document);
  }
  async update(id: GetPage, input: UpdatePage) {
    const document = await this.pageRepository.findOneAndUpdate(id, {
      $set: {
        data: {
          // title: capitalizar(input.title),
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
        'updateDate.updatedAt': new Date(),
        slug: slug(input.title),
      },
    });
    return this.toModel(document);
  }
  
  getPages() {
    return this.pageRepository.find({});
  }

  async deletePage(id: GetPage) {
    // await this.validateSite(id);
    await this.pageRepository.deleteOne(id);
    return 'delete page';
  }

  findPage5(pageId) {
    return this.pageRepository.find({ page: pageId });
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

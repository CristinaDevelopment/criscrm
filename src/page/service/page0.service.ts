import { Injectable } from '@nestjs/common';
import { slug } from 'src/utils/function';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { PageDocument } from '../entities/page.schema';
import { Page0Repository } from '../repository/page.repository';
import { capitalizar } from '../../utils/function';
import { GetPageArgs } from '../dto/page.args';

@Injectable()
export class Page0Service {
  constructor(
    private readonly pageRepository: Page0Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}
  async createPage(input: CreatePage) {
    const document = await this.pageRepository.create({
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
  async update(id: GetPageArgs, input: UpdatePage) {
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
        slug: slug(input.title),
        'updateDate.updatedAt': new Date(),
      },
    });
    return this.toModel(document);
  }

  getPages() {
    return this.pageRepository.find({});
  }
  async deletePage(id: GetPageArgs) {
    // await this.validateSite(id);
    await this.pageRepository.deleteOne(id);
    return 'delete page';
  }

  findPage0(pageId) {
    return this.pageRepository.find({ page: pageId });
  }


  private toModel(pageDocument: PageDocument) {
    return {
      _id: pageDocument._id.toHexString(),
      data: pageDocument.data,
      slug: pageDocument.slug,
    };
  }
}

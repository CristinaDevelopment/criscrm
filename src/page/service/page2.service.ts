import { Injectable } from '@nestjs/common';
import { capitalizar, slug } from 'src/utils/function';
import { GetPageArgs } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { PageDocument } from '../entities/page.schema';
import { Page2Repository } from '../repository/page2.repository';

@Injectable()
export class Page2Service {
  constructor(
    private readonly pageRepository: Page2Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}
  async createPage(input: CreatePage) {
    const document = await this.pageRepository.create({
      data: {
        // title: input.title,
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
      },
    });
    return this.toModel(document);
  }
  getPages2() {
    return this.pageRepository.find({});
  }

  async deletePage(id: GetPageArgs) {
    // await this.validateSite(id);
    await this.pageRepository.deleteOne(id);
    return 'delete page';
  }

  findPage2(pageId) {
    return this.pageRepository.find({ page: pageId });
  }

  findAll() {
    return `This action returns all page`;
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

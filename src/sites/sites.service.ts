import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { CreatePage } from 'src/pages/dto/page.input';
import { PageDocument } from 'src/pages/entities/page.schema';
import { Pages0Repository } from 'src/pages/repository/pages.repository';
import { uuidv3 } from 'src/utils';
import { capitalizar, slug } from 'src/utils/function';

import { GetSite } from '../sites/dto/site.args';
import {
  CreateSite,
  UpdateDataBase,
  UpdateSite,
} from '../sites/dto/site.input';
import { Site } from '../sites/entities/site.model';
import { SiteDocument } from '../sites/entities/site.schema';
import { SitesRepository } from '../sites/sites.repository';

@Injectable()
export class SitesService {
  constructor(
    private readonly siteRepository: SitesRepository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
    private readonly page0Repository: Pages0Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}

  async create(input: CreateSite) {
    const document = await this.siteRepository.create(
      this.documentCreate(input),
    );
    // await this.page0Repository.create(
    //   this.pageCreated({
    //     title: 'home',
    //     description: 'home description',
    //     src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
    //     alt: 'image description',
    //     type: 'page-blank',
    //     parent: document._id.toString(),
    //     site: document._id.toString(),
    //   }),
    // );
    return this.toModel(document);
  }
  async update(id: GetSite, input: UpdateSite) {
    const document = await this.siteRepository.findOneAndUpdate(id, {
      $set: this.documentUpdate(input),
      $push: {
        'updateDate.register': {
          uid: input.uid,
          change: input.change,
          updatedAt: new Date(),
        },
      },
    });
    return this.toModel(document);
  }

  async updateDataBase(id: GetSite, input: UpdateDataBase[]) {
    const document = await this.siteRepository.findOneAndUpdate(id, {
      $set: {
        'data.dataBase': input.map((data) => ({
          uid: uuidv3(),
          label: capitalizar(data.type),
          value: slug(data.type),
        })),
      },
    });
    return this.toModel(document);
  }

  async deleteSite(id: GetSite) {
    // await this.validateSite(id);
    await this.siteRepository.deleteOne(id);
    return id._id;
  }

  async deleteSites() {
    await this.siteRepository.deleteMany({});
    return 'sites deleted';
  }

  async findSite(id: GetSite) {
    const document = await this.siteRepository.findOne(id);
    return this.toModel(document);
  }

  findSites() {
    return this.siteRepository.find({});
  }

  all(pagination: ListInput) {
    return this.siteRepository.All(pagination);
  }

  private documentCreate(input: CreateSite) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      data: {
        name: input.name,
        description: input.description,
        dataBase: [],
        users: [],
        domain: {
          name: nameDomain,
          dlt: dlt,
        },
        type: input.type,
      },
      client: input.client,
      url: input.domain,
      updateDate: {
        createdAt: new Date(),
        register: [
          {
            uid: input.uid,
            change: 'created',
            updatedAt: new Date(),
          },
        ],
      },
    };
  }
  private documentUpdate(input: UpdateSite) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      'data.name': input.name,
      'data.domain': {
        name: nameDomain,
        dlt: dlt,
      },
      'data.description': input.description,
      'data.type': input.type,
      url: input.domain,
    };
  }

  // private pageCreated(input: CreatePage) {
  //   return {
  //     data: {
  //       type: input.type,
  //       seo: {
  //         title: capitalizar(input.title),
  //         href: slug(input.title),
  //         description: input.description,
  //         image: {
  //           src: input.src,
  //           alt: input.alt,
  //         },
  //       },
  //     },
  //     parent: input.parent,
  //     site: input.site,
  //     updateDate: {
  //       createdAt: new Date(),
  //     },
  //     slug: slug(input.title),
  //     section: [],
  //   };
  // }

  // private toModelPage(pageDocument: PageDocument) {
  //   return {
  //     _id: pageDocument._id.toHexString(),
  //     data: pageDocument.data,
  //     slug: pageDocument.slug,
  //   };
  // }

  private toModel(siteDocument: SiteDocument) {
    return {
      _id: siteDocument._id.toHexString(),
      data: siteDocument.data,
      client: siteDocument.client,
      url: siteDocument.url,
      updateDate: siteDocument.updateDate,
    };
  }
}

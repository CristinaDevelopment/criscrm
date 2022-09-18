import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { uuidv3 } from 'src/utils';

import { GetSite } from './dto/site.args';
import { CreateSite, UpdateDataBase, UpdateSite } from './dto/site.input';
import { Site } from './entities/site.model';
import { SiteDocument } from './entities/site.schema';
import { SiteRepository } from './site.repository';

@Injectable()
export class SiteService {
  constructor(
    private readonly siteRepository: SiteRepository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}

  async create(input: CreateSite) {
    const document = await this.siteRepository.create(
      this.documentCreate(input),
    );
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
          type: data.type,
        })),
      },
    });
    return this.toModel(document);
  }

  async deleteSite(id: GetSite) {
    // await this.validateSite(id);
    await this.siteRepository.deleteOne(id);
    return 'delete site';
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

  // findAll(pagination: ListInput) {
  //   return this.siteRepository.findAll(pagination);
  // }
  all(pagination: ListInput) {
    return this.siteRepository.All(pagination);
  }

  // getSitesByPagination(paginationQuery: ListInput) {
  //   return this.siteRepository.All(paginationQuery);
  // }

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

  private toModel(siteDocument: SiteDocument): Site {
    return {
      _id: siteDocument._id.toHexString(),
      data: siteDocument.data,
      client: siteDocument.client,
      url: siteDocument.url,
      updateDate: siteDocument.updateDate,
    };
  }
}

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
  UpdateImageSite,
  UpdateSite,
} from '../sites/dto/site.input';
import { SiteDocument } from '../sites/entities/site.schema';
import { SitesRepository } from '../sites/sites.repository';

@Injectable()
export class SitesService {
  constructor(
    private readonly siteRepository: SitesRepository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}

  async create(input: CreateSite) {
    const document = await this.siteRepository.create(
      this.documentCreate(input),
    );
    return this.toModel(document);
  }
  async update({ id }: GetSite, input: UpdateSite) {
    const document = await this.siteRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: this.documentUpdate(input),
        $push: {
          'updateDate.register': {
            uid: input.uid,
            change: input.change,
            updatedAt: new Date(),
          },
        },
      },
    );
    return this.toModel(document);
  }
  async updateImage(
    { id }: GetSite,
    input: UpdateImageSite,
    type: string,
    uid: string,
  ) {
    const document = await this.siteRepository.findOneAndUpdate(
      { _id: id },
      this.documentImage(input, type, uid),
    );
    return this.toModel(document);
  }

  async updateDataBase({ id }: GetSite, input: UpdateDataBase[]) {
    const document = await this.siteRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          'data.dataBase': input.map((data) => ({
            uid: uuidv3(),
            label: capitalizar(data.type),
            value: slug(data.type),
          })),
        },
      },
    );
    return this.toModel(document);
  }

  async deleteSite({ id }: GetSite) {
    // await this.validateSite(id);
    await this.siteRepository.deleteOne({ _id: id });
    return id;
  }

  async deleteSites() {
    await this.siteRepository.deleteMany({});
    return 'sites deleted';
  }

  async findSite({ id }: GetSite) {
    const document = await this.siteRepository.findOne({ _id: id });
    return this.toModel(document);
  }

  findSites() {
    return this.siteRepository.find({});
  }

  all(pagination: ListInput) {
    return this.siteRepository.All(pagination);
  }

  private documentCreate({
    domain,
    name,
    description,
    type,
    client,
    uid,
  }: CreateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      data: {
        name: name,
        description: description,
        dataBase: [],
        users: [],
        domain: {
          name: nameDomain,
          dlt: dlt,
        },
        type: type,
        seo: {
          title: name,
          href: '#',
          description: description,
          image: {
            src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
            alt: description,
          },
        },
      },
      client: client,
      url: domain,
      updateDate: {
        createdAt: new Date(),
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
  private documentUpdate({ domain, name, description, type }: UpdateSite) {
    const web = domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    return {
      'data.name': name,
      'data.domain': {
        name: nameDomain,
        dlt: dlt,
      },
      'data.description': description,
      'data.type': type,
      'data.seo': {
        title: name,
        href: '#',
        description: description,
        image: {
          src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
          alt: description,
        },
      },
      url: domain,
    };
  }

  private documentImage(
    { src, alt }: UpdateImageSite,
    type: string,
    uid: string,
  ) {
    return {
      $set:
        type === 'logo'
          ? {
              'data.logo': {
                src: src,
                alt: alt,
              },
            }
          : type === 'site'
          ? {
              'data.image': {
                src: src,
                alt: alt,
              },
              'data.seo.image.src': { src: src },
              'data.seo.image.alt': { src: alt },
            }
          : {
              'data.icon': {
                src: src,
                alt: alt,
              },
            },
      $push: {
        'updateDate.register': {
          uid: uid,
          change: `${type} image update`,
          updatedAt: new Date(),
        },
      },
    };
  }

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

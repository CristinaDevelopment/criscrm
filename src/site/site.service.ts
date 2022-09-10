import { Injectable } from '@nestjs/common';
import { uuidv3 } from 'src/utils';
import { capitalizar, slug } from 'src/utils/function';
import { getSiteV3 } from 'src/utils/functionV3';
import { GetChildrenV3, GetSiteArgsV3 } from './dto/site.args';
import {
  AddChildrenV3,
  CreateSiteV3,
  DeleteChildrenV3,
  UpdateChildrenV3,
  UpdateSiteV3,
} from './dto/site.input';
import { ChildrenV3, SeoV3, SiteV3 } from './entities/site.model';
import { SiteV3Document } from './entities/site.schema';
import { SiteV3Repository } from './site.repository';

@Injectable()
export class SiteV3Service {
  constructor(
    private readonly siteRepository: SiteV3Repository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}

  async createSite(input: CreateSiteV3) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    const document = await this.siteRepository.create({
      ...input,

      data: {
        name: input.name,
        numberPhone: input.numberPhone,
        address: input.address,
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
      children: [
        {
          uid: uuidv3(),
          seo: {
            name: 'Home',
            href: '',
            description: 'página de inicio',
            image: {
              src: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
              alt: 'image description',
            },
          },
          section: [],
          slug: 'home',
          type: 'page',
        },
      ],
      register: [
        {
          uid: input.uid,
          name: input.userName,
          role: input.role,
          change: input.change,
          date: Date.now().toString(),
        },
      ],
    });
    return this.toModel(document);
  }
  async updateSite(id: GetSiteArgsV3, input: UpdateSiteV3) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    const document = await this.siteRepository.findOneAndUpdate(id, {
      $set: {
        data: {
          name: input.name,
          numberPhone: input.numberPhone,
          domain: {
            name: nameDomain,
            dlt: dlt,
          },
          address: input.address,
          description: input.description,
          type: input.type,
        },
        url: input.domain,
      },
      $push: {
        register: {
          uid: input.uid,
          name: input.userName,
          role: input.role,
          change: input.change,
          date: Date.now().toString(),
        },
      },
    });
    return this.toModel(document);
  }
  async deleteSite(id: GetSiteArgsV3) {
    // await this.validateSite(id);
    await this.siteRepository.deleteOne(id);
    return 'delete site';
  }

  async deleteSites() {
    await this.siteRepository.deleteMany({});
    return 'sites deleted';
  }

  async getSite(id: GetSiteArgsV3) {
    const document = await this.siteRepository.findOne(id);
    return this.toModel(document);
  }

  getSites() {
    return this.siteRepository.find({});
  }

  async getChildrens(input: GetChildrenV3) {
    // const sites = this.siteRepository.find({});
    let document;
    if (input.children_uid_0) {
      document = await (
        await this.siteRepository.findOne({ _id: input._id })
      ).children.find((data) => data.slug === input.children_uid_0);
    } else if (input._id) {
      document = await (
        await this.siteRepository.findOne({ _id: input._id })
      ).children;
    }
    // console.log(input);
    return document
  }

  async getChildren(input: GetChildrenV3) {
    let document;
    if (input.children_uid_0) {
      document = await (
        await this.siteRepository.findOne({ _id: input._id })
      ).children.find((data) => data.slug === input.children_uid_0);
      // } else if (input._id) {
    }
    // console.log(input);

    return document;
  }

  async addChildren(id: GetSiteArgsV3, input: AddChildrenV3) {
    const document = await this.siteRepository.findOneAndUpdate(
      id,
      {
        $push: input.children_uid_4
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children':
                this.children(input),
            }
          : input.children_uid_3
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children':
                this.children(input),
            }
          : input.children_uid_2
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children':
                this.children(input),
            }
          : input.children_uid_1
          ? {
              'children.$[lvl0].children.$[lvl1].children':
                this.children(input),
            }
          : input.children_uid_0
          ? {
              'children.$[lvl0].children': this.children(input),
            }
          : {
              children: this.children(input),
            },
      },
      {
        arrayFilters: input.children_uid_4
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
              { 'lvl4.seo.href': input.children_uid_4 },
            ]
          : input.children_uid_3
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
            ]
          : input.children_uid_2
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
            ]
          : input.children_uid_1
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
            ]
          : input.children_uid_0
          ? [{ 'lvl0.seo.href': input.children_uid_0 }]
          : [],
      },
    );
    return document;
  }

  async updateChildren(id: GetSiteArgsV3, input: UpdateChildrenV3) {
    const document = await this.siteRepository.findOneAndUpdate(
      id,
      {
        $set: input.children_uid_5
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].seo':
                this.seo(input),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].slug':
                slug(input.name),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].type':
                input.type,
            }
          : input.children_uid_4
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].seo':
                this.seo(input),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].type':
                input.type,
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].slug':
                slug(input.name),
            }
          : input.children_uid_3
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].seo':
                this.seo(input),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].type':
                input.type,
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].slug':
                slug(input.name),
            }
          : input.children_uid_2
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].seo':
                this.seo(input),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].slug': slug(
                input.name,
              ),
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].type':
                input.type,
            }
          : input.children_uid_1
          ? {
              'children.$[lvl0].children.$[lvl1].seo': this.seo(input),
              'children.$[lvl0].children.$[lvl1].slug': slug(input.name),
              'children.$[lvl0].children.$[lvl1].type': input.type,
            }
          : {
              'children.$[lvl0].seo': this.seo(input),
              'children.$[lvl0].slug': slug(input.name),
              'children.$[lvl0].type': input.type,
            },
      },
      {
        arrayFilters: input.children_uid_5
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
              { 'lvl4.seo.href': input.children_uid_4 },
              { 'lvl5.seo.href': input.children_uid_5 },
            ]
          : input.children_uid_4
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
              { 'lvl4.seo.href': input.children_uid_4 },
            ]
          : input.children_uid_3
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
            ]
          : input.children_uid_2
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
            ]
          : input.children_uid_1
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
            ]
          : [{ 'lvl0.seo.href': input.children_uid_0 }],
      },
    );
    return document;
  }

  async deleteChildren(id: GetSiteArgsV3, input: DeleteChildrenV3) {
    const document = await this.siteRepository.findOneAndUpdate(
      id,
      {
        $pull: input.children_uid_5
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children':
                {
                  uid: input.children_uid_5,
                },
            }
          : input.children_uid_4
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children':
                {
                  uid: input.children_uid_4,
                },
            }
          : input.children_uid_3
          ? {
              'children.$[lvl0].children.$[lvl1].children.$[lvl2].children': {
                uid: input.children_uid_3,
              },
            }
          : input.children_uid_2
          ? {
              'children.$[lvl0].children.$[lvl1].children': {
                uid: input.children_uid_2,
              },
            }
          : input.children_uid_1
          ? {
              'children.$[lvl0].children': {
                uid: input.children_uid_1,
              },
            }
          : {
              children: {
                uid: input.children_uid_0,
              },
            },
      },
      {
        arrayFilters: input.children_uid_5
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
              { 'lvl4.seo.href': input.children_uid_4 },
            ]
          : input.children_uid_4
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
              { 'lvl3.seo.href': input.children_uid_3 },
            ]
          : input.children_uid_3
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
              { 'lvl2.seo.href': input.children_uid_2 },
            ]
          : input.children_uid_2
          ? [
              { 'lvl0.seo.href': input.children_uid_0 },
              { 'lvl1.seo.href': input.children_uid_1 },
            ]
          : input.children_uid_1
          ? [{ 'lvl0.seo.href': input.children_uid_0 }]
          : [],
      },
    );
    return document;
  }

  private children(input: AddChildrenV3 | UpdateChildrenV3): ChildrenV3 {
    return {
      uid: uuidv3(),
      seo: this.seo(input),
      slug: slug(input.name),
      type: input.type,
    };
  }
  private seo(input: AddChildrenV3 | UpdateChildrenV3): SeoV3 {
    return {
      name: capitalizar(input.name),
      href: slug(input.name) === 'home' ? '' : slug(input.name),
      description: input.description,
      image: {
        src: input.src,
        alt: input.alt,
      },
    };
  }

  private toModel(siteDocument: SiteV3Document): SiteV3 {
    return {
      _id: siteDocument._id.toHexString(),
      data: siteDocument.data,
      client: siteDocument.client,
      url: siteDocument.url,
      children: siteDocument.children,
      register: siteDocument.register,
    };
  }
}

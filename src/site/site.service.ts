import { Injectable } from '@nestjs/common';

import { GetSiteArgs } from './dto/site.args';
import { CreateSite, UpdateSite } from './dto/site.input';
import { Site } from './entities/site.model';
import { SiteDocument } from './entities/site.schema';
import { SiteRepository } from './site.repository';

@Injectable()
export class SiteService {
  constructor(
    private readonly siteRepository: SiteRepository, // @Inject('PRODUCT_SERVICE') // private readonly communicationCliente: ClientProxy,
  ) {}

  async createSite(input: CreateSite) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    const document = await this.siteRepository.create({
      ...input,

      data: {
        name: input.name,
        // numberPhone: input.numberPhone,
        // address: input.address,
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
      register: [
        {
          uid: input.uid,
          change: input.change,
          date: Date.now().toString(),
        },
      ],
    });
    return this.toModel(document);
  }
  async updateSite(id: GetSiteArgs, input: UpdateSite) {
    const web = input.domain.split('.');
    const nameDomain = web[0];
    web.shift();
    const dlt = web.join('.');
    const document = await this.siteRepository.findOneAndUpdate(id, {
      $set: {
        data: {
          name: input.name,
          domain: {
            name: nameDomain,
            dlt: dlt,
          },
          description: input.description,
          type: input.type,
        },
        url: input.domain,
      },
      $push: {
        register: {
          uid: input.uid,
          change: input.change,
          date: Date.now().toString(),
        },
      },
    });
    return this.toModel(document);
  }
  async deleteSite(id: GetSiteArgs) {
    // await this.validateSite(id);
    await this.siteRepository.deleteOne(id);
    return 'delete site';
  }

  async deleteSites() {
    await this.siteRepository.deleteMany({});
    return 'sites deleted';
  }

  async getSite(id: GetSiteArgs) {
    const document = await this.siteRepository.findOne(id);
    return this.toModel(document);
  }

  getSites() {
    return this.siteRepository.find({});
  }

  // async getChildrens(input: GetChildren) {
  //   // const sites = this.siteRepository.find({});
  //   let document;
  //   if (input.children_uid_0) {
  //     document = await (
  //       await this.siteRepository.findOne({ _id: input._id })
  //     ).children.find((data) => data.slug === input.children_uid_0);
  //   } else if (input._id) {
  //     document = await (
  //       await this.siteRepository.findOne({ _id: input._id })
  //     ).children;
  //   }
  //   // console.log(input);
  //   return document;
  // }

  // async getChildren(input: GetChildren) {
  //   let document;
  //   if (input.children_uid_0) {
  //     document = await (
  //       await this.siteRepository.findOne({ _id: input._id })
  //     ).children.find((data) => data.slug === input.children_uid_0);
  //     // } else if (input._id) {
  //   }
  //   // console.log(input);

  //   return document;
  // }

  // async addChildren(id: GetSiteArgs, input: AddChildren) {
  //   const document = await this.siteRepository.findOneAndUpdate(
  //     id,
  //     {
  //       $push: input.children_uid_4
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children':
  //               this.children(input),
  //           }
  //         : input.children_uid_3
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children':
  //               this.children(input),
  //           }
  //         : input.children_uid_2
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children':
  //               this.children(input),
  //           }
  //         : input.children_uid_1
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children':
  //               this.children(input),
  //           }
  //         : input.children_uid_0
  //         ? {
  //             'children.$[lvl0].children': this.children(input),
  //           }
  //         : {
  //             children: this.children(input),
  //           },
  //     },
  //     {
  //       arrayFilters: input.children_uid_4
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //             { 'lvl4.seo.href': input.children_uid_4 },
  //           ]
  //         : input.children_uid_3
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //           ]
  //         : input.children_uid_2
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //           ]
  //         : input.children_uid_1
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //           ]
  //         : input.children_uid_0
  //         ? [{ 'lvl0.seo.href': input.children_uid_0 }]
  //         : [],
  //     },
  //   );
  //   return document;
  // }

  // async updateChildren(id: GetSiteArgs, input: UpdateChildren) {
  //   const document = await this.siteRepository.findOneAndUpdate(
  //     id,
  //     {
  //       $set: input.children_uid_5
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].seo':
  //               this.seo(input),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].slug':
  //               slug(input.name),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children.$[lvl5].type':
  //               input.type,
  //           }
  //         : input.children_uid_4
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].seo':
  //               this.seo(input),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].type':
  //               input.type,
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].slug':
  //               slug(input.name),
  //           }
  //         : input.children_uid_3
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].seo':
  //               this.seo(input),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].type':
  //               input.type,
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].slug':
  //               slug(input.name),
  //           }
  //         : input.children_uid_2
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].seo':
  //               this.seo(input),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].slug': slug(
  //               input.name,
  //             ),
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].type':
  //               input.type,
  //           }
  //         : input.children_uid_1
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].seo': this.seo(input),
  //             'children.$[lvl0].children.$[lvl1].slug': slug(input.name),
  //             'children.$[lvl0].children.$[lvl1].type': input.type,
  //           }
  //         : {
  //             'children.$[lvl0].seo': this.seo(input),
  //             'children.$[lvl0].slug': slug(input.name),
  //             'children.$[lvl0].type': input.type,
  //           },
  //     },
  //     {
  //       arrayFilters: input.children_uid_5
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //             { 'lvl4.seo.href': input.children_uid_4 },
  //             { 'lvl5.seo.href': input.children_uid_5 },
  //           ]
  //         : input.children_uid_4
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //             { 'lvl4.seo.href': input.children_uid_4 },
  //           ]
  //         : input.children_uid_3
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //           ]
  //         : input.children_uid_2
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //           ]
  //         : input.children_uid_1
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //           ]
  //         : [{ 'lvl0.seo.href': input.children_uid_0 }],
  //     },
  //   );
  //   return document;
  // }

  // async deleteChildren(id: GetSiteArgs, input: DeleteChildren) {
  //   const document = await this.siteRepository.findOneAndUpdate(
  //     id,
  //     {
  //       $pull: input.children_uid_5
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children.$[lvl4].children':
  //               {
  //                 uid: input.children_uid_5,
  //               },
  //           }
  //         : input.children_uid_4
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children.$[lvl3].children':
  //               {
  //                 uid: input.children_uid_4,
  //               },
  //           }
  //         : input.children_uid_3
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children.$[lvl2].children': {
  //               uid: input.children_uid_3,
  //             },
  //           }
  //         : input.children_uid_2
  //         ? {
  //             'children.$[lvl0].children.$[lvl1].children': {
  //               uid: input.children_uid_2,
  //             },
  //           }
  //         : input.children_uid_1
  //         ? {
  //             'children.$[lvl0].children': {
  //               uid: input.children_uid_1,
  //             },
  //           }
  //         : {
  //             children: {
  //               uid: input.children_uid_0,
  //             },
  //           },
  //     },
  //     {
  //       arrayFilters: input.children_uid_5
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //             { 'lvl4.seo.href': input.children_uid_4 },
  //           ]
  //         : input.children_uid_4
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //             { 'lvl3.seo.href': input.children_uid_3 },
  //           ]
  //         : input.children_uid_3
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //             { 'lvl2.seo.href': input.children_uid_2 },
  //           ]
  //         : input.children_uid_2
  //         ? [
  //             { 'lvl0.seo.href': input.children_uid_0 },
  //             { 'lvl1.seo.href': input.children_uid_1 },
  //           ]
  //         : input.children_uid_1
  //         ? [{ 'lvl0.seo.href': input.children_uid_0 }]
  //         : [],
  //     },
  //   );
  //   return document;
  // }

  // private children(input: AddChildren | UpdateChildren): Children {
  //   return {
  //     uid: uuid(),
  //     seo: this.seo(input),
  //     slug: slug(input.name),
  //     type: input.type,
  //   };
  // }
  // private seo(input: AddChildren | UpdateChildren): Seo {
  //   return {
  //     name: capitalizar(input.name),
  //     href: slug(input.name) === 'home' ? '' : slug(input.name),
  //     description: input.description,
  //     image: {
  //       src: input.src,
  //       alt: input.alt,
  //     },
  //   };
  // }

  private toModel(siteDocument: SiteDocument): Site {
    return {
      _id: siteDocument._id.toHexString(),
      data: siteDocument.data,
      client: siteDocument.client,
      url: siteDocument.url,
      register: siteDocument.register,
    };
  }
}

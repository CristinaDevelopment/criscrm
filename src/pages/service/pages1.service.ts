import { Injectable } from '@nestjs/common';
import { ListInput } from 'src/common/pagination/dto/list.input';
import { UpdateImage } from 'src/product/dto/product.input';
import { GetPage, GetSite } from '../dto/page.args';
import { CreatePage, UpdatePage } from '../dto/page.input';
import { Page1 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';
import { Pages1Repository } from '../repository/pages.repository';

@Injectable()
export class Pages1Service {
  constructor(private readonly pageRepository: Pages1Repository) {}

  async create(input: CreatePage) {
    const document = await this.pageRepository.add(input);
    return this.toModel(document);
  }

  async update({ id }: GetPage, input: UpdatePage) {
    const document = await this.pageRepository.update(id, input);
    return this.toModel(document);
  }
  async updateImage({ id }: GetPage, input: UpdateImage, uid: string) {
    const document = await this.pageRepository.updateImage(id, input, uid);
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
  async deletePagesByParent(ids: string[]) {
    await this.pageRepository.deleteManyPagesByParent(ids);
    return ids;
  }
  async deletePagesById(ids: string[]) {
    await this.pageRepository.deleteManyPages(ids);
    return ids;
  }
  findByParentId(parentId: string) {
    return this.pageRepository.find({ parent: parentId });
  }

  all(pagination: ListInput, parentId: string) {
    return this.pageRepository.All(pagination, { parent: parentId });
  }

  private toModel(pageDocument: PageDocument): Page1 {
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

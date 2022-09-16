import { Injectable } from '@nestjs/common';
import { uuidv3 } from 'src/utils';
import { slug } from 'src/utils/function';
import { BlogRepository } from './blog.repository';
import { CreateBlog } from './dto/blog.input';
import { Blog } from './entities/blog.model';
import { BlogDocument } from './entities/blog.schema';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(input: CreateBlog) {
    // await this.validateDomain(input);
    const {
      title,
      content,
      description,
      meta,
      tags,
      author,
      site,
      src,
      alt,
      category,
      page,
    } = input;
    const data = await this.blogRepository.create({
      data: {
        title: title,
        slug: slug(title),
        content: content,
        description: description,
        category: category,
        meta: meta,
        tags: tags.map((data) => ({ uid: uuidv3(), text: data })),
        author: author,
        thumbnail: { src: src, alt: alt },
        seo: {
          name: title,
          href: slug(title),
          description: description,
          image: {
            src: src,
            alt: alt,
          },
        },
      },
      site: site,
      page: page,
      updateDate: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return this.toModel(data);
  }

  findBySiteId(siteId) {
    return this.blogRepository.find({ site: siteId });
  }
  findByPageId(pageId) {
    return this.blogRepository.find({ page: pageId });
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  private toModel(blogDocument: BlogDocument): Blog {
    return {
      _id: blogDocument._id.toHexString(),
      data: blogDocument.data,
      site: blogDocument.site,
      page: blogDocument.page,
      updateDate: blogDocument.updateDate,
    };
  }
}

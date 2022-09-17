import { Injectable } from '@nestjs/common';
import { uuidv3 } from 'src/utils';
import { capitalizar, slug } from 'src/utils/function';
import { BlogRepository } from './blog.repository';
import { CreateBlog, UpdateBlog } from './dto/blog.input';
import { Blog } from './entities/blog.model';
import { BlogDocument } from './entities/blog.schema';
import { PubSub } from 'graphql-subscriptions';
import { GetBlog } from './dto/blog.args';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly pubSub: PubSub,
  ) {}

  async create(input: CreateBlog) {
    const data = await this.blogRepository.create(this.createBlog(input));
    const newPost = this.toModel(data);
    this.pubSub.publish('blogAdded', { blogAdded: newPost });
    return newPost;
  }

  async update(id: GetBlog, input: UpdateBlog) {
    const document = await this.blogRepository.findOneAndUpdate(id, {
      $set: this.updateBlog(input),
      $push: { 'updateDate.register': { updatedAt: new Date() } },
    });
    return this.toModel(document);
  }
  async findOne(id: GetBlog) {
    const document = await this.blogRepository.findOne(id);
    return this.toModel(document);
  }
  findBySiteId(siteId) {
    return this.blogRepository.find({ site: siteId });
  }
  findByPageId(pageId) {
    return this.blogRepository.find({ page: pageId });
  }

  findAll() {
    return this.blogRepository.find({});
  }

  all(pagination: ListInput) {
    return this.blogRepository.All(pagination);
  }

  async deleteOne(id: GetBlog) {
    // await this.validateSite(id);
    await this.blogRepository.deleteOne(id);
    return 'delete blog';
  }

  private createBlog(input: CreateBlog) {
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
    return {
      data: {
        title: capitalizar(input.title),
        slug: slug(title),
        content: content,
        description: description,
        category: category,
        meta: meta,
        tags: tags.map((data) => ({ uid: uuidv3(), text: data })),
        author: author,
        thumbnail: { src: src, alt: alt },
        seo: {
          title: capitalizar(input.title),
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
      },
    };
  }
  private updateBlog(input: UpdateBlog) {
    const {
      title,
      content,
      description,
      meta,
      tags,
      author,
      src,
      alt,
      category,
    } = input;
    return {
      data: {
        title: capitalizar(input.title),
        slug: slug(title),
        content: content,
        description: description,
        category: category,
        meta: meta,
        tags: tags.map((data) => ({ uid: uuidv3(), text: data })),
        author: author,
        thumbnail: { src: src, alt: alt },
        seo: {
          title: capitalizar(input.title),
          href: slug(title),
          description: description,
          image: {
            src: src,
            alt: alt,
          },
        },
      },
      
    };
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

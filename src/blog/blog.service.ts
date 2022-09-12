import { Injectable } from '@nestjs/common';
import { uuidv3 } from 'src/utils';
import { slug } from 'src/utils/function';
import { BlogRepository } from './blog.repository';
import { CreateBlog } from './dto/blog.input';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.model';
import { BlogDocument } from './entities/blog.schema';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}
  create(createBlogInput: CreateBlogInput) {
    return 'This action adds a new blog';
  }

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
    } = input;
    const data = await this.blogRepository.create({
      ...input,
      data: {
        title: title,
        slug: slug(title),
        content: content,
        description: description,
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
      category: category,
    });
    return this.toModel(data);
  }

  findBySiteId(siteId) {
    return this.blogRepository.find({ site: siteId });
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogInput: UpdateBlogInput) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  private toModel(blogDocument: BlogDocument): Blog {
    return {
      _id: blogDocument._id.toHexString(),
      data: blogDocument.data,
      site: blogDocument.site,
      category: blogDocument.category,
    };
  }
}

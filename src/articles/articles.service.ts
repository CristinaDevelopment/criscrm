import { Injectable } from '@nestjs/common';
import { uuidv3 } from 'src/utils';
import { capitalizar, slug } from 'src/utils/function';
import { ArticlesRepository } from './articles.repository';
import { CreateArticle, UpdateArticle } from './dto/article.input';
import { Article } from './entities/article.model';
import { ArticleDocument } from './entities/article.schema';
import { PubSub } from 'graphql-subscriptions';
import { GetArticle } from './dto/article.args';
import { ListInput } from 'src/common/pagination/dto/list.input';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticlesRepository,
    private readonly pubSub: PubSub,
  ) {}

  async create(input: CreateArticle) {
    const data = await this.articleRepository.create(this.createArticle(input));
    const newPost = this.toModel(data);
    this.pubSub.publish('articleAdded', { articleAdded: newPost });
    return newPost;
  }

  async update(id: GetArticle, input: UpdateArticle) {
    const document = await this.articleRepository.findOneAndUpdate(id, {
      $set: this.updateArticle(input),
      $push: { 'updateDate.register': { updatedAt: new Date() } },
    });
    return this.toModel(document);
  }
  async findOne(id: GetArticle) {
    const document = await this.articleRepository.findOne(id);
    return this.toModel(document);
  }
  findBySiteId(siteId) {
    return this.articleRepository.find({ site: siteId });
  }

  findByParentId(parentId) {
    return this.articleRepository.find({ parent: parentId });
  }

  findAll() {
    return this.articleRepository.find({});
  }

  all(pagination: ListInput) {
    return this.articleRepository.All(pagination);
  }

  async deleteOne(id: GetArticle) {
    // await this.validateSite(id);
    await this.articleRepository.deleteOne(id);
    return id._id;
  }

  private createArticle(input: CreateArticle) {
    const { title, description, author, site, category, parent } = input;
    return {
      data: {
        title: capitalizar(title),
        slug: slug(title),
        description: description,
        category: category,
        author: author,
        thumbnail: {
          uid: uuidv3(),
          src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
          alt: description,
        },
        seo: {
          title: capitalizar(title),
          href: slug(title),
          description: description,
          image: {
            uid: uuidv3(),
            src: 'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg',
            alt: description,
          },
        },
      },
      site: site,
      parent: parent,
      updateDate: {
        createdAt: new Date(),
      },
    };
  }
  private updateArticle(input: UpdateArticle) {
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
        thumbnail: {
          uid: uuidv3(),
          src: src,
          alt: alt,
        },
        seo: {
          title: capitalizar(input.title),
          href: slug(title),
          description: description,
          image: {
            uid: uuidv3(),
            src: src,
            alt: alt,
          },
        },
      },
    };
  }

  private toModel(articleDocument: ArticleDocument): Article {
    return {
      _id: articleDocument._id.toHexString(),
      data: articleDocument.data,
      site: articleDocument.site,
      parent: articleDocument.parent,
      updateDate: articleDocument.updateDate,
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Page0 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';

@Injectable()
export class Page0Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page0Repository.name);
  constructor(@InjectModel(Page0.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

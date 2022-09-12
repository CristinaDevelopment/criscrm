import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Page2 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';

@Injectable()
export class Page2Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page2Repository.name);
  constructor(@InjectModel(Page2.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

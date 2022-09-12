import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Page3 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';

@Injectable()
export class Page3Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page3Repository.name);
  constructor(@InjectModel(Page3.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

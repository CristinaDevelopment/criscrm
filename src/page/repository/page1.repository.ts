import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Page1 } from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';

@Injectable()
export class Page1Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page1Repository.name);
  constructor(@InjectModel(Page1.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

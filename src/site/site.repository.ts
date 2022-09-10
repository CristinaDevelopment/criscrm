import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { SiteV3 } from './entities/site.model';
import { SiteV3Document } from './entities/site.schema';

@Injectable()
export class SiteV3Repository extends AbstractRepository<SiteV3Document> {
  protected readonly logger = new Logger(SiteV3Repository.name);

  constructor(@InjectModel(SiteV3.name) siteModel: Model<SiteV3Document>) {
    super(siteModel);
  }
}

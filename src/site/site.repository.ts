import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import { Site } from './entities/site.model';
import { SiteDocument } from './entities/site.schema';

@Injectable()
export class SiteRepository extends AbstractRepository<SiteDocument> {
  protected readonly logger = new Logger(SiteRepository.name);

  constructor(
    @InjectModel(Site.name, 'sitesDB') siteModel: Model<SiteDocument>,
  ) {
    super(siteModel);
  }
}

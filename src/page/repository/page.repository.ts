import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/common/abstract';
import {
  Page0,
  Page1,
  Page10,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
  Page7,
  Page8,
  Page9,
} from '../entities/page.model';
import { PageDocument } from '../entities/page.schema';
@Injectable()
export class Page0Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page0Repository.name);
  constructor(@InjectModel(Page0.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page1Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page1Repository.name);
  constructor(@InjectModel(Page1.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page2Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page2Repository.name);
  constructor(@InjectModel(Page2.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

@Injectable()
export class Page3Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page3Repository.name);
  constructor(@InjectModel(Page3.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page4Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page4Repository.name);
  constructor(@InjectModel(Page4.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page5Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page5Repository.name);
  constructor(@InjectModel(Page5.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page6Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page6Repository.name);
  constructor(@InjectModel(Page6.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page7Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page7Repository.name);
  constructor(@InjectModel(Page7.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page8Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page8Repository.name);
  constructor(@InjectModel(Page8.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page9Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page9Repository.name);
  constructor(@InjectModel(Page9.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}
@Injectable()
export class Page10Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Page10Repository.name);
  constructor(@InjectModel(Page10.name) pageModel: Model<PageDocument>) {
    super(pageModel);
  }
}

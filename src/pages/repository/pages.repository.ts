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
export class Pages0Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages0Repository.name);
  constructor(
    @InjectModel(Page0.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages1Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages1Repository.name);
  constructor(
    @InjectModel(Page1.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages2Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages2Repository.name);
  constructor(
    @InjectModel(Page2.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

@Injectable()
export class Pages3Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages3Repository.name);
  constructor(
    @InjectModel(Page3.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages4Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages4Repository.name);
  constructor(
    @InjectModel(Page4.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages5Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages5Repository.name);
  constructor(
    @InjectModel(Page5.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages6Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages6Repository.name);
  constructor(
    @InjectModel(Page6.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages7Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages7Repository.name);
  constructor(
    @InjectModel(Page7.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages8Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages8Repository.name);
  constructor(
    @InjectModel(Page8.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages9Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages9Repository.name);
  constructor(
    @InjectModel(Page9.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}
@Injectable()
export class Pages10Repository extends AbstractRepository<PageDocument> {
  protected readonly logger = new Logger(Pages10Repository.name);
  constructor(
    @InjectModel(Page10.name, 'pagesDB') pageModel: Model<PageDocument>,
  ) {
    super(pageModel);
  }
}

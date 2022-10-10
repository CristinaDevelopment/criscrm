import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from 'src/articles/articles.module';
import { ProductModule } from 'src/product/product.module';
import {
  Page0,
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
} from './entities/page.model';
import {
  Page0Schema,
  Page1Schema,
  Page2Schema,
  Page3Schema,
  Page4Schema,
  Page5Schema,
  Page6Schema,
} from './entities/page.schema';
import {
  Pages0Repository,
  Pages1Repository,
  Pages2Repository,
  Pages3Repository,
  Pages4Repository,
  Pages5Repository,
  Pages6Repository,
  Pages7Repository,
  Pages8Repository,
  Pages9Repository,
  Pages10Repository,
} from './repository/pages.repository';
import {
  Pages0Resolver,
  Pages1Resolver,
  Pages2Resolver,
  Pages3Resolver,
  Pages4Resolver,
  Pages5Resolver,
} from './resolver';
import {
  Pages0Service,
  Pages1Service,
  Pages2Service,
  Pages3Service,
  Pages4Service,
  Pages5Service,
  Pages6Service,
} from './service';
import { TasksService } from '../sites/task.service';

@Module({
  imports: [
    ProductModule,
    ArticlesModule,
    MongooseModule.forFeature(
      [{ name: Page0.name, schema: Page0Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page1.name, schema: Page1Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page2.name, schema: Page2Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page3.name, schema: Page3Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page4.name, schema: Page4Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page5.name, schema: Page5Schema }],
      'pagesDB',
    ),
    MongooseModule.forFeature(
      [{ name: Page6.name, schema: Page6Schema }],
      'pagesDB',
    ),
  ],
  providers: [
    Pages0Repository,
    Pages0Resolver,
    Pages0Service,
    Pages1Repository,
    Pages1Resolver,
    Pages1Service,
    Pages2Repository,
    Pages2Resolver,
    Pages2Service,
    Pages3Repository,
    Pages3Resolver,
    Pages3Service,
    Pages4Repository,
    Pages4Resolver,
    Pages4Service,
    Pages5Repository,
    Pages5Resolver,
    Pages5Service,
    Pages6Repository,
    Pages6Service,
  ],
  exports: [
    Pages0Service,
    Pages1Service,
    Pages2Service,
    Pages0Repository,
    Pages1Repository,
    Pages2Repository,
    Pages3Repository,
    Pages4Repository,
  ],
})
export class PagesModule {}

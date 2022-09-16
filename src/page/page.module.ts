import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from 'src/blog/blog.module';
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
  Page0Repository,
  Page1Repository,
  Page2Repository,
  Page3Repository,
  Page4Repository,
  Page5Repository,
  Page6Repository,
  Page7Repository,
  Page8Repository,
  Page9Repository,
  Page10Repository,
} from './repository/page.repository';
import {
  Page0Resolver,
  Page1Resolver,
  Page2Resolver,
  Page3Resolver,
  Page4Resolver,
  Page5Resolver,
} from './resolver';
import {
  Page0Service,
  Page1Service,
  Page2Service,
  Page3Service,
  Page4Service,
  Page5Service,
  Page6Service,
} from './service';

@Module({
  imports: [
    ProductModule,
    BlogModule,
    MongooseModule.forFeature([{ name: Page0.name, schema: Page0Schema }]),
    MongooseModule.forFeature([{ name: Page1.name, schema: Page1Schema }]),
    MongooseModule.forFeature([{ name: Page2.name, schema: Page2Schema }]),
    MongooseModule.forFeature([{ name: Page3.name, schema: Page3Schema }]),
    MongooseModule.forFeature([{ name: Page4.name, schema: Page4Schema }]),
    MongooseModule.forFeature([{ name: Page5.name, schema: Page5Schema }]),
    MongooseModule.forFeature([{ name: Page6.name, schema: Page6Schema }]),
  ],
  providers: [
    Page0Repository,
    Page0Resolver,
    Page0Service,
    Page1Repository,
    Page1Resolver,
    Page1Service,
    Page2Repository,
    Page2Resolver,
    Page2Service,
    Page3Repository,
    Page3Resolver,
    Page3Service,
    Page4Repository,
    Page4Resolver,
    Page4Service,
    Page5Repository,
    Page5Resolver,
    Page5Service,
    Page6Repository,
    Page6Service,
  ],
  exports: [Page0Service],
})
export class PageModule {}

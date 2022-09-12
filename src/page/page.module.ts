import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page0, Page1, Page2, Page3 } from './entities/page.model';
import {
  Page0Schema,
  Page1Schema,
  Page2Schema,
  Page3Schema,
} from './entities/page.schema';
import { Page0Service } from './service/page0.service';
import { Page0Repository } from './repository/page0.repository';
import { Page0Resolver } from './resolver/page0.resolver';
import { Page1Repository } from './repository/page1.repository';
import { Page1Resolver } from './resolver/page1.resolver';
import { Page1Service } from './service/page1.service';
import { Page2Repository } from './repository/page2.repository';
import { Page2Resolver } from './resolver/page2.resolver';
import { Page2Service } from './service/page2.service';
import { Page3Repository } from './repository/page3.repository';
import { Page3Service } from './service/page3.service';
import { Page3Resolver } from './resolver/page3.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page0.name, schema: Page0Schema }]),
    MongooseModule.forFeature([{ name: Page1.name, schema: Page1Schema }]),
    MongooseModule.forFeature([{ name: Page2.name, schema: Page2Schema }]),
    MongooseModule.forFeature([{ name: Page3.name, schema: Page3Schema }]),
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
  ],
  exports: [Page0Service],
})
export class PageModule {}

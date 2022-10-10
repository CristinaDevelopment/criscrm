import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesResolver } from './sites.resolver';
import { SitesRepository } from './sites.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Site } from './entities/site.model';
import { SiteSchema } from './entities/site.schema';
import { PagesModule } from 'src/pages/pages.module';
import { TasksService } from './task.service';

@Module({
  imports: [
    // ProductModule,
    PagesModule,
    // BlogModule,
    MongooseModule.forFeature(
      [{ name: Site.name, schema: SiteSchema }],
      'sitesDB',
    ),
  ],
  providers: [SitesResolver, SitesService, SitesRepository, TasksService],
})
export class SitesModule {}

import { Module } from '@nestjs/common';
import { SiteRepository } from './site.repository';
import { SiteResolver } from './site.resolver';
import { SiteService } from './site.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Site } from './entities/site.model';
import { SiteSchema } from './entities/site.schema';
import { ProductModule } from 'src/product/product.module';
import { BlogModule } from 'src/blog/blog.module';
import { PageModule } from 'src/page/page.module';

@Module({
  imports: [
    ProductModule,
    PageModule,
    BlogModule,
    MongooseModule.forFeature([{ name: Site.name, schema: SiteSchema }]),
  ],
  providers: [SiteRepository, SiteResolver, SiteService],
})
export class SiteModule {}

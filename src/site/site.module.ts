import { Module } from '@nestjs/common';
import { SiteV3Repository } from './site.repository';
import { SiteV3Resolver } from './site.resolver';
import { SiteV3Service } from './site.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteV3 } from './entities/site.model';
import { SiteV3Schema } from './entities/site.schema';
import { ProductModule } from 'src/product/product.module';
import { BlogModule } from 'src/blog/blog.module';

@Module({
  imports: [
    ProductModule,
    BlogModule,
    MongooseModule.forFeature([{ name: SiteV3.name, schema: SiteV3Schema }]),
  ],
  providers: [SiteV3Repository, SiteV3Resolver, SiteV3Service],
})
export class SiteModule {}

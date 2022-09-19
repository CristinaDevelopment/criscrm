import { Module } from '@nestjs/common';
import { BeveragesService } from './beverages.service';
import { BeveragesResolver } from './beverages.resolver';

@Module({
  providers: [BeveragesResolver, BeveragesService]
})
export class BeveragesModule {}

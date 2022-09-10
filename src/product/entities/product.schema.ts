import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import * as mongoose from 'mongoose';
import { Article } from './product.model';
import { SiteV3 } from 'src/site/entities/site.model';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({ type: Article })
  article: Article;

  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  children: string;
}

export const ClothingSchema = SchemaFactory.createForClass(ProductDocument);
export const FurnitureSchema = SchemaFactory.createForClass(ProductDocument);

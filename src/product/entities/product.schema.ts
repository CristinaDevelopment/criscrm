import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataProduct } from './product.model';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop({ type: DataProduct })
  data: DataProduct;

  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  parent: string;
  
  @Prop({ trim: true })
  type: string;

  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;

}

export const ClothingSchema = SchemaFactory.createForClass(ProductDocument);
export const BackpackSchema = SchemaFactory.createForClass(ProductDocument);
export const HandbagSchema = SchemaFactory.createForClass(ProductDocument);

export const FurnitureSchema = SchemaFactory.createForClass(ProductDocument);

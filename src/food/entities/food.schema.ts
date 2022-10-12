import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataFood } from './food.model';

@Schema({ versionKey: false })
export class FoodDocument extends AbstractDocument {
  @Prop({ type: DataFood })
  data: DataFood;

  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  parent: string;

  @Prop({ trim: true })
  type: string;

  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;
}

export const FoodSchema = SchemaFactory.createForClass(FoodDocument);

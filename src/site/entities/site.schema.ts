import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { Data } from './site.model';


@Schema({ versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({ type: Data })
  data: Data;
  @Prop({ trim: true })
  client: string;
  @Prop({ trim: true })
  url: string;
  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);

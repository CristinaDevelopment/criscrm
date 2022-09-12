import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { Data, Register } from './site.model';


@Schema({ versionKey: false })
export class SiteDocument extends AbstractDocument {
  @Prop({ type: Data })
  data: Data;
  @Prop({ trim: true })
  client: string;
  @Prop({ trim: true })
  url: string;
  @Prop([Register])
  register: Register[];
}

export const SiteSchema = SchemaFactory.createForClass(SiteDocument);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { ComponentPage, DataPage } from './page.model';


@Schema({ versionKey: false })
export class PageDocument extends AbstractDocument {
  @Prop({ type: DataPage })
  data: DataPage;
  @Prop({ trim: true })
  slug: string;
  @Prop({ trim: true })
  page: string;
  @Prop({ trim: true })
  site: string;
  @Prop([ComponentPage])
  section: ComponentPage[];
  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;

}

export const Page0Schema = SchemaFactory.createForClass(PageDocument);
export const Page1Schema = SchemaFactory.createForClass(PageDocument);
export const Page2Schema = SchemaFactory.createForClass(PageDocument);
export const Page3Schema = SchemaFactory.createForClass(PageDocument);
export const Page4Schema = SchemaFactory.createForClass(PageDocument);
export const Page5Schema = SchemaFactory.createForClass(PageDocument);
export const Page6Schema = SchemaFactory.createForClass(PageDocument);
export const Page7Schema = SchemaFactory.createForClass(PageDocument);
export const Page8Schema = SchemaFactory.createForClass(PageDocument);
export const Page9Schema = SchemaFactory.createForClass(PageDocument);
export const Page10Schema = SchemaFactory.createForClass(PageDocument);

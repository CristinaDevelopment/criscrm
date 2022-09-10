import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { ChildrenV3, DataV3, RegisterV3 } from './site.model';


@Schema({ versionKey: false })
export class SiteV3Document extends AbstractDocument {
  @Prop({ type: DataV3 })
  data: DataV3;
  @Prop({ trim: true })
  client: string;
  @Prop({ trim: true })
  url: string;
  @Prop([ChildrenV3])
  children: ChildrenV3[];
  @Prop([RegisterV3])
  register: RegisterV3[];
}

export const SiteV3Schema = SchemaFactory.createForClass(SiteV3Document);

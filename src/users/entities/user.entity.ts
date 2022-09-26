import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { AbstractModel } from 'src/common/abstract';
import { Image, UpdateDate } from 'src/common/model/model';

export class OAuth {
  name: string
  status: boolean
}

export class DataUser {
  readonly username: string;
  readonly role: string;
  readonly image: Image;
  readonly status: boolean;
  readonly oAuth: OAuth[];
}

export type UserDocument = User & Document;
@Schema({ versionKey: false })
export class User extends AbstractModel {
  @Prop({ type: DataUser })
  data: DataUser;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  site: string;
  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataUser, UpdateDateUser } from './user.model';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ type: DataUser })
  data: DataUser;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  site: string;
  @Prop({ type: UpdateDateUser })
  updateDate: UpdateDateUser;

}
export const UserSchema = SchemaFactory.createForClass(UserDocument);

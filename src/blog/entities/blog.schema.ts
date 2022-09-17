import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataBlog } from './blog.model';

@Schema({ versionKey: false })

export class BlogDocument extends AbstractDocument {
  @Prop({ type: DataBlog })
  data: DataBlog;
  
  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  page: string;

  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;

}

export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
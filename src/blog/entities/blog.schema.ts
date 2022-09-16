import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataBlog, UpdateDateBlog } from './blog.model';

@Schema({ versionKey: false })

export class BlogDocument extends AbstractDocument {
  @Prop({ type: DataBlog })
  data: DataBlog;
  
  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  page: string;

  @Prop({ type: UpdateDateBlog })
  updateDate: UpdateDateBlog;

}

export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
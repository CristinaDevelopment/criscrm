import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataBlog } from './blog.model';

@Schema({ timestamps: true, versionKey: false })

export class BlogDocument extends AbstractDocument {
  @Prop({ type: DataBlog })
  data: DataBlog;
  
  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  category: string;

}

export const BlogSchema = SchemaFactory.createForClass(BlogDocument);
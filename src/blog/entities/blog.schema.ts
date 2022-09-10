import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { DataBlogV3 } from './blog.model';

@Schema({ timestamps: true, versionKey: false })

export class BlogV3Document extends AbstractDocument {
  @Prop({ type: DataBlogV3 })
  data: DataBlogV3;
  
  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  category: string;

}

export const BlogV3Schema = SchemaFactory.createForClass(BlogV3Document);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/abstract';
import { UpdateDate } from 'src/common/model/model';
import { DataArticle } from './article.model';

@Schema({ versionKey: false })

export class ArticleDocument extends AbstractDocument {
  @Prop({ type: DataArticle })
  data: DataArticle;
  
  @Prop({ trim: true })
  site: string;

  @Prop({ trim: true })
  parent: string;

  @Prop({ type: UpdateDate })
  updateDate: UpdateDate;

}

export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);
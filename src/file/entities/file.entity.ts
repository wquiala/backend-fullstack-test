import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class File extends Document {
  @Prop({
    index: true,
  })
  name: string;

  type: string | null;

  @Prop({
    index: true,
  })
  extention: string | null;
}

export const FileSchema = SchemaFactory.createForClass(File);

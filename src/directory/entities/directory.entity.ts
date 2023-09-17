import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { File } from 'src/file/entities/file.entity';

@Schema()
export class Directory extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    index: true,
  })
  location: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.Array },
    ] /* [{ type: mongoose.Schema.Types.Array }]  */,
  })
  content: Document<Directory>[] | [];

  @Prop({
    index: true,
  })
  dateCreated: string | null;

  @Prop({
    index: true,
  })
  lastUpdate: string | null;
}

export const DirectorySchema = SchemaFactory.createForClass(Directory);

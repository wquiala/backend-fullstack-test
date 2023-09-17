import { Module } from '@nestjs/common';
import { FileSystemEntryService } from './file-system-entry.service';
import { FileSystemEntryController } from './file-system-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FileSystemEntry,
  FileSystemEntrySchema,
} from './entities/file-system-entry.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FileSystemEntry.name,
        schema: FileSystemEntrySchema,
      },
    ]),
  ],
  controllers: [FileSystemEntryController],
  providers: [FileSystemEntryService],
})
export class FileSystemEntryModule {}

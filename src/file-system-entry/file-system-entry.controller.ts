import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileSystemEntryService } from './file-system-entry.service';
import { CreateFileSystemEntryDto } from './dto/create-file-system-entry.dto';
import { UpdateFileSystemEntryDto } from './dto/update-file-system-entry.dto';

@Controller('file-system-entry')
export class FileSystemEntryController {
  constructor(
    private readonly fileSystemEntryService: FileSystemEntryService,
  ) {}

  @Post()
  create(@Body() createFileSystemEntryDto: CreateFileSystemEntryDto) {
    return this.fileSystemEntryService.create(createFileSystemEntryDto);
  }

  @Get()
  findAll() {
    return this.fileSystemEntryService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.fileSystemEntryService.findOne(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileSystemEntryDto: UpdateFileSystemEntryDto,
  ) {
    return this.fileSystemEntryService.update(id, updateFileSystemEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileSystemEntryService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { FileSystemEntryService } from './file-system-entry.service';
import { CreateFileSystemEntryDto } from './dto/create-file-system-entry.dto';
import { UpdateFileSystemEntryDto } from './dto/update-file-system-entry.dto';

@Controller('file-system-entry')
export class FileSystemEntryController {
  constructor(
    private readonly fileSystemEntryService: FileSystemEntryService,
  ) {}

  @Post(':id')
  copy(
    @Param('id') id: string,
    @Body() createFileSystemEntryDto: CreateFileSystemEntryDto,
  ) {
    return this.fileSystemEntryService.copy(id, createFileSystemEntryDto);
  }
  @Post()
  create(@Body() createFileSystemEntryDto: CreateFileSystemEntryDto) {
    return this.fileSystemEntryService.create(createFileSystemEntryDto);
  }

  @Get()
  findAll() {
    return this.fileSystemEntryService.findAll();
  }

  @Get('entrychild/:id')
  FindChild(@Param('id') id: string) {
    return this.fileSystemEntryService.FindChild(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log();
    return this.fileSystemEntryService.findOne(id);
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

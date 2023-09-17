import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Post()
  create(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.directoryService.create(createDirectoryDto);
  }

  @Get()
  findAll() {
    return this.directoryService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.directoryService.findOne(term);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    return this.directoryService.update(name, updateDirectoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directoryService.remove(id);
  }
}

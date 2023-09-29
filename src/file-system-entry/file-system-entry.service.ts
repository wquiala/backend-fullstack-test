import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFileSystemEntryDto } from './dto/create-file-system-entry.dto';
import { UpdateFileSystemEntryDto } from './dto/update-file-system-entry.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types, isValidObjectId } from 'mongoose';
import { FileSystemEntry } from './entities/file-system-entry.entity';

@Injectable()
export class FileSystemEntryService {
  constructor(
    @InjectModel(FileSystemEntry.name)
    private readonly fileSystemEntryModel: Model<FileSystemEntry>,
  ) {}

  async create(createFileSystemEntryDto: CreateFileSystemEntryDto) {
    const { name: nameDTO, parent: parentDTO } = createFileSystemEntryDto;
    const nameEntryDb = await this.fileSystemEntryModel
      .where({ parent: parentDTO })
      .findOne({ name: nameDTO });
    if (nameEntryDb) throw new BadRequestException('Nombres duplicados');
    let entry;
    let pathP: string;
    let data;
    if (isValidObjectId(parentDTO)) {
      entry = await this.fileSystemEntryModel.findOne({
        _id: parentDTO,
      });

      if (entry) {
        pathP = `${entry.path}/${entry.name}`;
        data = { ...createFileSystemEntryDto, path: pathP };
      }
    } else {
      data = { ...createFileSystemEntryDto, path: '/', parent: '/' };
    }

    try {
      const fileSystemEntry = await this.fileSystemEntryModel.create(data);

      return fileSystemEntry;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Error de llaves duplicadas en database ${JSON.stringify(
            error.keyValue,
          )}`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException(`No se puede crear el directorio`);
    }
  }

  async findAll() {
    const fileSystemEntry = await this.fileSystemEntryModel.find({
      parent: '/',
    });

    return fileSystemEntry;
  }

  async FindChild(id: string) {
    const child = await this.fileSystemEntryModel.find({ parent: id });
    return child;
  }

  async findOne(id: string) {
    const fileSystemEntry = await this.fileSystemEntryModel.findById(id);

    return fileSystemEntry;
  }

  async update(id: string, updateFileSystemEntryDto: UpdateFileSystemEntryDto) {
    const { content, name, parent, type } = updateFileSystemEntryDto;
    const nameEntryDb = await this.fileSystemEntryModel
      .where({ parent })
      .findOne({ name });
    if (nameEntryDb) throw new BadRequestException('Nombres duplicados');
    let updated = {};
    let entry;
    let pathP = '';
    if (type === 'folder') {
      if (parent && isValidObjectId(parent)) {
        entry = await this.fileSystemEntryModel.findOne({
          _id: parent,
        });
        entry ? (pathP = `${entry.path}/${entry.name}`) : (pathP = '/');
        updated = await this.fileSystemEntryModel.findByIdAndUpdate(id, {
          name,
          parent,
          path: pathP,
        });
      }

      return updated;
    }
    if (type === 'file') {
      if (parent && isValidObjectId(parent)) {
        entry = await this.fileSystemEntryModel.findOne({
          _id: parent,
        });
        entry ? (pathP = `${entry.path}/${entry.name}`) : (pathP = '/');
        updated = await this.fileSystemEntryModel.findByIdAndUpdate(id, {
          name,
          content,
          parent,
          path: pathP,
        });
        return updated;
      }
    }
    /* const fileSystemEntry = await this.fileSystemEntryModel.findByIdAndUpdate(
      id,
      updateFileSystemEntryDto,
    ); */
  }

  async copy(id: string, createFileSystemEntryDto: CreateFileSystemEntryDto) {
    return id;
  }

  async remove(id: string) {
    await this.fileSystemEntryModel.findByIdAndDelete(id);
    const child = await this.fileSystemEntryModel.find({ parent: id });
    child.forEach(async (element) => {
      await this.fileSystemEntryModel.findByIdAndDelete(element.id);
    });
  }
}

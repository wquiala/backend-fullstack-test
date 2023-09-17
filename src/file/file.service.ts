import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<File>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    createFileDto.name = createFileDto.name.toLocaleLowerCase();
    try {
      const file = await this.fileModel.create(createFileDto);

      return file;
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

  findAll() {
    return `This action returns all file`;
  }

  async findOne(term: string) {
    const file = await this.fileModel.findOne({
      name: term.toLowerCase().trim(),
    });

    if (!file) {
      throw new NotFoundException(
        `El elemento con nombre ${term} no ha sido encontrado`,
      );
    }
    return file;
  }

  async update(name: string, updateFileDto: UpdateFileDto) {
    const directory = await this.findOne(name);
    if (updateFileDto.name)
      updateFileDto.name = updateFileDto.name.toLocaleLowerCase();
    await directory.updateOne(updateFileDto, { new: true });
    return { ...directory, ...updateFileDto };
  }

  async remove(id: number) {
    await this.fileModel.findByIdAndDelete(id);
  }
}

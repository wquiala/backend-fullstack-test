import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { Model } from 'mongoose';
import { Directory } from './entities/directory.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name)
    private readonly directoryModel: Model<Directory>,
  ) {}

  async create(createDirectoryDto: CreateDirectoryDto) {
    createDirectoryDto.name = createDirectoryDto.name.toLocaleLowerCase();
    try {
      const directory = await this.directoryModel.create(createDirectoryDto);

      return directory;
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
    return `This action returns all directory`;
  }

  async findOne(term: string) {
    const directory = await this.directoryModel.findOne({
      name: term.toLowerCase().trim(),
    });

    if (!directory) {
      throw new NotFoundException(
        `El elemento con nombre ${term} no ha sido encontrado`,
      );
    }
    return directory;
  }

  async update(name: string, updateDirectoryDto: UpdateDirectoryDto) {
    const directory = await this.findOne(name);
    let data = null;
    const { content } = directory;
    console.log(directory);
    if (updateDirectoryDto.name)
      updateDirectoryDto.name = updateDirectoryDto.name.toLocaleLowerCase();

    if (updateDirectoryDto.content) {
      data = {
        ...updateDirectoryDto,
        content: [...content, updateDirectoryDto.content],
      };
    }
    /*     const { content, ...date } = updateDirectoryDto;
     */ await directory.updateOne(data, { new: true });
    return { ...directory, ...updateDirectoryDto };
  }

  async remove(id: string) {
    await this.directoryModel.findByIdAndDelete(id);
  }
}

import {
  Allow,
  IsDate,
  IsJSON,
  IsObject,
  IsString,
  Min,
  MinDate,
  MinLength,
  isObject,
} from 'class-validator';
import { Directory, DirectorySchema } from '../entities/directory.entity';
import { File } from 'src/file/entities/file.entity';
import { Document } from 'mongoose';

export class CreateDirectoryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  location: string;

  @Allow()
  content: Directory;

  /* @IsDate()
  @MinDate(new Date()) */
  @IsString()
  dateCreated: Date | null;

  /* @IsDate()
  @MinDate(new Date()) */
  @IsString()
  lastUpdate: Date | null;
}

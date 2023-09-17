import { IsString, MinLength } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  location: string | null;

  @IsString()
  type: string | null;

  @IsString()
  extention: string | null;
}

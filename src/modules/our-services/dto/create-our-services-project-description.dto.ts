import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOurServiceProjectDescriptionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  our_service_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  thumbnail: Express.Multer.File;

  @ApiProperty({
    isArray: true,
    type: String,
    description: 'Array of project names',
  })
  @Transform(({ value }) => value.split(','))
  @IsNotEmpty()
  project_name: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateContactUsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contact_no: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  attached_file: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  budget: number;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  facebook_link: string;
}

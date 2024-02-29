import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateManagementDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sub_title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  thumbnail: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  image: Express.Multer.File;
}

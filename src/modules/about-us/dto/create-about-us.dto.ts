import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAboutUsDto {
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
  image: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  video: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  total_project: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  total_project_text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  team_member: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  team_member_text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rating: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rating_text: string;
}

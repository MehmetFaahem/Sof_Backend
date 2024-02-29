import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOurServiceDto {
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
}

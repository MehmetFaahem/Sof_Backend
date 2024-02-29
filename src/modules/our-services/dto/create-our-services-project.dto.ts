import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOurServiceProjectDto {
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
  logo: Express.Multer.File;
}

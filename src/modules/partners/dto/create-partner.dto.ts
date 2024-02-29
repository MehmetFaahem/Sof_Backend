import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  logo: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  alt: string;
}

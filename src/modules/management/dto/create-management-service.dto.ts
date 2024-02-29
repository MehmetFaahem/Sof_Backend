import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateManagementServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  managementId: string;

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
  logo: string;
}

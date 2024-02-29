import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOurPlanPackageServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  package_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;
}

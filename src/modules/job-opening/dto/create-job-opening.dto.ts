import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobOpeningDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  job_category: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  job_type: string;

  @ApiProperty({ required: false, type: 'string', format: 'date' })
  @IsDate()
  @IsOptional()
  apply_deadline: Date;
}

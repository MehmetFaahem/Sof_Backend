import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateTestimonialReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  avatar: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @Min(0)
  @Max(5)
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}

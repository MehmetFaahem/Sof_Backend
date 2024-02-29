import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { SocialLinks } from '../entities/our-team.entity';

export class SocialLinkDto {
  @ApiProperty({ type: String, default: '' })
  @IsUrl()
  // @Transform(({ value }) => value || undefined)
  @IsNotEmpty()
  facebook_link: string;

  @ApiProperty({ type: String, default: null })
  @IsUrl()
  @IsNotEmpty()
  twitter_link: string;

  @ApiProperty({ type: String, default: null })
  @IsUrl()
  @IsNotEmpty()
  linkedin_link: string;
}

export class CreateOurTeamMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  our_member_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  image: Express.Multer.File;

  @ApiProperty({ type: SocialLinkDto })
  @Transform(({ value }) => JSON.parse(value))
  @IsNotEmpty()
  social_links: SocialLinkDto;
}

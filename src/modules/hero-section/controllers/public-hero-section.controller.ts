import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/common/pagination';
import { HeroSectionService } from '../hero-section.service';

@ApiTags('Hero section')
@ApiResponse({
  status: 201,
  description: 'Partner has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
// parent api for request handling
@Controller('public/hero-section')
export class PublicHeroSectionController {
  // create constructor for class
  constructor(public readonly heroSecService: HeroSectionService) {}

  // Get all hero section list by pagination
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const data = await this.heroSecService.findAllByPublic(q);
    return {
      message: 'Hero section data successfully',
      data: data,
    };
  }

  @Get('/id')
  async findOne(@Param('id') id: string) {
    const data = await this.heroSecService.findOne(id);
    return {
      message: 'Hero section details successfully',
      data: data,
    };
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AboutUsService } from '../about-us.service';
@ApiTags('About us')
@Controller('public/about-us')
export class PublicAboutUsController {
  constructor(public readonly aboutUsService: AboutUsService) {}

  // find all with this request
  @Get('/')
  @ApiOperation({ summary: 'Get all Partner' })
  @ApiResponse({
    status: 200,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  async findAll(@Query() q: any) {
    const data = await this.aboutUsService.findAllByPublic(q);
    return {
      message: 'About us get successfully',
      data: data,
    };
  }

  // find by id in for the public users
  @Get('/:id')
  @ApiOperation({ summary: 'Get all Partner' })
  @ApiResponse({
    status: 200,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.aboutUsService.findOneByPublic(id);
    return {
      message: 'About us details get successfully',
      data: data,
    };
  }
}

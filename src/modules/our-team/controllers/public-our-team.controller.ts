import { Controller, Get, Param, Query } from '@nestjs/common';
import { OurTeamService } from '../our-team.service';
import { Pagination } from 'src/common/pagination';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Our Team')
@Controller('public/our-team')
export class PublicOurTeamController {
  constructor(private readonly ourTeamService: OurTeamService) {}

  @ApiOperation({ summary: 'Get All Services' })
  @ApiResponse({
    status: 201,
    description: 'Services has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const services = await this.ourTeamService.findAllByPublic(q);
    return {
      message: 'Our service list get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Get A Service' })
  @ApiResponse({
    status: 201,
    description: 'Service has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const services = await this.ourTeamService.findOneByPublic(id);
    return {
      message: 'Our Service details get successfully',
      data: services,
    };
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { OurServicesService } from '../our-services.service';
import { Pagination } from 'src/common/pagination';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Our Services')
@Controller('public/our-services')
export class PublicOurServicesController {
  constructor(private readonly ourServicesService: OurServicesService) {}

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
    const services = await this.ourServicesService.findAllByPublic(q);
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
    const services = await this.ourServicesService.findOneByPublic(id);
    return {
      message: 'Our Service details get successfully',
      data: services,
    };
  }
}

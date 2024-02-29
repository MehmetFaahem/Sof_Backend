import { Controller, Get, Param, Query } from '@nestjs/common';
import { ManagementService } from '../management.service';
import { Pagination } from 'src/common/pagination';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Management')
@Controller('public/management')
export class PublicManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @ApiOperation({ summary: 'Get All Management' })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const services = await this.managementService.findAllByPublic(q);
    return {
      message: 'Our service list get successfully',
      data: services,
    };
  }
  @ApiOperation({ summary: 'Get A Management' })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const management = await this.managementService.findOneByPublic(id);
    return {
      message: 'Management details get successfully',
      data: management,
    };
  }
}

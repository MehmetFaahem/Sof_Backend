import { Controller, Get, Query } from '@nestjs/common';
import { PartnersService } from '../partners.service';
import { Pagination } from 'src/common/pagination';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Trusted company')
@ApiResponse({
  status: 201,
  description: 'Partner has been successfully fetched',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
@Controller('public/trusted-company')
export class PublicPartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @ApiOperation({ summary: 'Get trusted company list with partner details' })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const partners = await this.partnersService.findAllByPublic(q);
    return {
      message: 'Our partners list get successfully',
      data: partners,
    };
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactUsService } from '../contact-us.service';
import { Pagination } from '../../../common/pagination';

@ApiTags('Contact us')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'full_name should not be empty',
})
@Controller('admin/contact-us')
export class AdminContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Get('/')
  async create(@Query() q: Pagination) {
    const data = await this.contactUsService.findAll(q);
    return {
      message: 'Contact us list get successfully',
      data: data,
    };
  }
}

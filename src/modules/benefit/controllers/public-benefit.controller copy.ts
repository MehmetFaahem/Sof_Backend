import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BenefitService } from '../benefit.service';

@ApiTags('Benefits')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title should not be empty',
})
@Controller('public/benefit')
export class PublicBenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all benefit' })
  async findAll() {
    const data = await this.benefitService.findAllByPublic();
    return {
      message: 'Benefit get successfully',
      data: data,
    };
  }
}

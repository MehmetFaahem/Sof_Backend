import { Controller, Get, Param } from '@nestjs/common';
import { OurPlanService } from '../our-plan.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Our plan')
@ApiResponse({
  status: 200,
  description: 'Plan has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
@Controller('/public/our-plan')
export class PublicOurPlanController {
  constructor(private readonly ourPlanService: OurPlanService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all plan' })
  async findAll() {
    const data = await this.ourPlanService.findAllByPublic();
    return {
      message: 'Plan list get successfully',
      data: data,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all plan details' })
  async findOne(@Param('id') id: string) {
    const data = await this.ourPlanService.findOneByPublic(id);
    return {
      message: 'Plan get successfully',
      data: data,
    };
  }
}

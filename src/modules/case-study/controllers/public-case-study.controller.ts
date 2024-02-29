import { Controller, Get, Param } from '@nestjs/common';
import { CaseStudyService } from '../case-study.service';
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Case Study')
@Controller('/public/case-study')
export class PublicCaseStudyController {
  constructor(private readonly caseStudyService: CaseStudyService) {}

  @ApiOperation({ summary: 'Get All Case studies' })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  public async findAllByPublic() {
    const data = await this.caseStudyService.findAllByPublic();
    return {
      message: 'Case study created successfully.',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Get A Case study' })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.caseStudyService.findOne(id);
    return {
      message: 'Case study created successfully.',
      data: data,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { JobOpeningService } from '../job-opening.service';
import { CreateJobOpeningDto } from '../dto/create-job-opening.dto';
import { UpdateJobOpeningDto } from '../dto/update-job-opening.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Job opening')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title should not be empty',
})
@Controller('admin/job-opening')
export class AdminJobOpeningController {
  constructor(private readonly jobOpeningService: JobOpeningService) {}

  @Post()
  @ApiOperation({ summary: 'Create a open position' })
  async create(@Body() dto: CreateJobOpeningDto) {
    const data = await this.jobOpeningService.create(dto);
    return {
      message: 'Job opening created successfully',
      data: data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.jobOpeningService.findAllByAdmin();
    return {
      message: 'Job opening get successfully',
      data: data,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.jobOpeningService.findOne(id);
    return {
      message: 'Job opening get successfully',
      data: data,
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateJobOpeningDto) {
    const data = await this.jobOpeningService.update(id, dto);
    return {
      message: 'Job opening updated successfully',
      data: data,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.jobOpeningService.remove(id);
    return {
      message: 'Job opening delete successfully',
      data: data,
    };
  }
}

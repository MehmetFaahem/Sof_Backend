import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobOpeningService } from '../job-opening.service';
import { CreateJobOpeningDto } from '../dto/create-job-opening.dto';
import { UpdateJobOpeningDto } from '../dto/update-job-opening.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Job opening')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title should not be empty',
})
@Controller('public/job-opening')
export class PublicJobOpeningController {
  constructor(private readonly jobOpeningService: JobOpeningService) {}

  @Post()
  create(@Body() createJobOpeningDto: CreateJobOpeningDto) {
    return this.jobOpeningService.create(createJobOpeningDto);
  }

  @Get('/')
  async findAll() {
    const data = await this.jobOpeningService.findAllByPublic();
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
}

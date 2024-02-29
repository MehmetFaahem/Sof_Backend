import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { CaseStudyService } from '../case-study.service';
import { CreateCaseStudyProjectDto } from '../dto/create-case-study-project.dto';
import { CreateCaseStudyDto } from '../dto/create-case-study.dto';
import { UpdateCaseStudyDto } from '../dto/update-case-study.dto';
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Case Study')
@Controller('admin/case-study')
export class AdminCaseStudyController {
  constructor(private readonly caseStudyService: CaseStudyService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a Case Study' })
  @ApiBody({
    type: CreateCaseStudyDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  public async create(@Body() createDto: CreateCaseStudyDto) {
    const caseStudy = await this.caseStudyService.create(createDto);
    return {
      message: 'Case study created successfully.',
      data: caseStudy,
    };
  }

  @Post('/project')
  @ApiOperation({ summary: 'Create a Case Study Project' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateCaseStudyProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Case Study Project has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @UseInterceptors(FileInterceptor('thumbnail', imageOptions))
  public async createProject(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateCaseStudyProjectDto,
  ) {
    const caseStudy = await this.caseStudyService.createProject(
      file,
      createDto,
    );
    return {
      message: 'Case study created successfully.',
      data: caseStudy,
    };
  }

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
  public async findAllByAdmin() {
    const data = await this.caseStudyService.findAllByAdmin();
    return {
      message: 'Case study created successfully.',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Get A Case Study' })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.caseStudyService.findOne(id);
    return {
      message: 'Case study details get successfully.',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Update Case Study' })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCaseStudyDto) {
    const data = await this.caseStudyService.updateByAdmin(id, updateDto);
    return {
      message: 'Case study updated successfully.',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Remove Case Study' })
  @ApiResponse({
    status: 201,
    description: 'Case Study has been successfully removed',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.caseStudyService.remove(id);
    return {
      message: 'Case study deleted successfully.',
      data: data,
    };
  }
}

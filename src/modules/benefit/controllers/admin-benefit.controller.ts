import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { BenefitService } from '../benefit.service';
import { CreateBenefitDto } from '../dto/create-benefit.dto';
import { UpdateBenefitDto } from '../dto/update-benefit.dto';

@ApiTags('Benefits')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title should not be empty',
})
@Controller('admin/benefit')
export class AdminBenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create benefit' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('logo', imageOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateBenefitDto,
  ) {
    const data = await this.benefitService.create(file, dto);
    return {
      message: 'Benefit created successfully',
      data: data,
    };
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all benefits' })
  async findAll() {
    const data = await this.benefitService.findAllByAdmin();
    return {
      message: 'Benefit get successfully',
      data: data,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get benefit details' })
  async findOne(@Param('id') id: string) {
    const data = await this.benefitService.findOneByAdmin(id);
    return {
      message: 'Benefit get successfully',
      data: data,
    };
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'update a benefit' })
  @UseInterceptors(FileInterceptor('logo', imageOptions))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateBenefitDto,
  ) {
    const data = await this.benefitService.updateByAdmin(id, file, dto);
    return {
      message: 'Update benefit successfully',
      data: data,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.benefitService.remove(id);
    return {
      message: 'Benefit deleted successfully',
      data: data,
    };
  }
}

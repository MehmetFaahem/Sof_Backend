import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { OurPlanService } from '../our-plan.service';
import { CreateOurPlanDto } from '../dto/create-our-plan.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOurPlanPackageDto } from '../dto/create-our-plan-package.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { CreateOurPlanPackageServiceDto } from '../dto/create-ourplan-package-service.dto';
import { UpdateOurPlanPackageDto } from '../dto/update-our-plan-package.dto';

@ApiTags('Our plan')
@ApiResponse({
  status: 201,
  description: 'Plan has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
@Controller('/admin/our-plan')
export class AdminOurPlanController {
  constructor(private readonly ourPlanService: OurPlanService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a Plan' })
  @ApiBody({
    type: CreateOurPlanDto,
  })
  async create(@Body() createDto: CreateOurPlanDto) {
    const data = await this.ourPlanService.create(createDto);
    return {
      message: 'Our plan crated successfully',
      data: data,
    };
  }

  @Post('/package')
  @ApiOperation({ summary: 'Create a Package' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateOurPlanPackageDto,
  })
  @UseInterceptors(FileInterceptor('icon', imageOptions))
  async createPackage(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createDto: CreateOurPlanPackageDto,
  ) {
    const data = await this.ourPlanService.createPackage(logo, createDto);
    return {
      message: 'Our plan crated successfully',
      data: data,
    };
  }

  @Put('/package')
  @ApiOperation({ summary: 'update a Package' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateOurPlanPackageDto,
  })
  @UseInterceptors(FileInterceptor('icon', imageOptions))
  async updatePackage(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createDto: UpdateOurPlanPackageDto,
  ) {
    const data = await this.ourPlanService.updatePackage(logo, createDto);
    return {
      message: 'Our plan crated successfully',
      data: data,
    };
  }

  @Post('/package/service')
  @ApiOperation({ summary: 'Create a Package service' })
  @ApiBody({
    type: CreateOurPlanPackageServiceDto,
  })
  async createPackageService(
    @Body() createDto: CreateOurPlanPackageServiceDto,
  ) {
    const data = await this.ourPlanService.createPackageService(createDto);
    return {
      message: 'Our plan crated successfully',
      data: data,
    };
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all plan' })
  async findAll() {
    const data = await this.ourPlanService.findAllByAdmin();
    return {
      message: 'Price plan get successfully',
      data: data,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get all plan' })
  async findOne(@Param('id') id: string) {
    const data = await this.ourPlanService.findOneByAdmin(id);
    return {
      message: 'Plan details get successfully',
      data: data,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OurServicesService } from '../our-services.service';
import { CreateOurServiceDto } from '../dto/create-our-service.dto';
import { UpdateOurServiceDto } from '../dto/update-our-service.dto';
import { Pagination } from 'src/common/pagination';
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { CreateOurServiceProjectDto } from '../dto/create-our-services-project.dto';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOurServiceProjectDescriptionDto } from '../dto/create-our-services-project-description.dto';

@ApiTags('Our Services')
@Controller('admin/our-services')
export class AdminOurServicesController {
  constructor(private readonly ourServicesService: OurServicesService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a Service' })
  @ApiBody({
    type: CreateOurServiceDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Service has been successfully created.',
  })
  async create(@Body() createDto: CreateOurServiceDto) {
    const ourService = await this.ourServicesService.create(createDto);
    return {
      message: 'The service created successfully.',
      data: ourService,
    };
  }

  @Post('/projects')
  @ApiOperation({ summary: 'Create a Service Project' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateOurServiceProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Service Project has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('logo', imageOptions))
  async createServiceProject(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createDto: CreateOurServiceProjectDto,
  ) {
    const ourService = await this.ourServicesService.createServiceProject(
      logo,
      createDto,
    );
    return {
      message: 'Service project created successfully.',
      data: ourService,
    };
  }

  @Post('/projects/description')
  @ApiOperation({ summary: 'Create a Service Project' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateOurServiceProjectDescriptionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Service Project Description has been successfully created.',
  })
  @UseInterceptors(FileInterceptor('thumbnail', imageOptions))
  async createServiceProjectDescription(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createDto: CreateOurServiceProjectDescriptionDto,
  ) {
    const ourService =
      await this.ourServicesService.createServiceProjectDescription(
        thumbnail,
        createDto,
      );
    return {
      message: 'Service project created successfully.',
      data: ourService,
    };
  }

  @ApiOperation({ summary: 'Get All Services' })
  @ApiResponse({
    status: 201,
    description: 'Services has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const services = await this.ourServicesService.findAllByAdmin(q);
    return {
      message: 'Our service list get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Get A Service' })
  @ApiResponse({
    status: 201,
    description: 'Service has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const services = await this.ourServicesService.findOneByAdmin(id);
    return {
      message: 'Our service details get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Update a Service' })
  @ApiResponse({
    status: 201,
    description: 'Services has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateOurServiceDto: UpdateOurServiceDto,
  ) {
    const services = await this.ourServicesService.update(
      id,
      updateOurServiceDto,
    );
    return {
      message: 'Our service updated get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Remove a Service' })
  @ApiResponse({
    status: 201,
    description: 'Services has been successfully removed',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.ourServicesService.remove(id);
    return {
      message: 'Our service deleted successfully',
      data: data,
    };
  }
}

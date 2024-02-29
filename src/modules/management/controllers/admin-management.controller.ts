import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { ManagementService } from '../management.service';
import { CreateManagementDto } from '../dto/create-management.dto';
import { UpdateManagementDto } from '../dto/update-management.dto';
import { Pagination } from 'src/common/pagination';
import {
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { CreateManagementServiceDto } from '../dto/create-management-service.dto';

@ApiTags('Management')
@Controller('admin/management')
export class AdminManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a Management' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateManagementDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      imageOptions,
    ),
  )
  async create(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
    @Body() body: CreateManagementDto,
  ) {
    const ourService = await this.managementService.create(files, body);
    return {
      message: 'The service created successfully.',
      data: ourService,
    };
  }

  @ApiOperation({ summary: 'Create Management Service' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Management service has been successfully created',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Post('/service')
  @UseInterceptors(FileInterceptor('logo', imageOptions))
  async createManagementService(
    @UploadedFile() logo: Express.Multer.File,
    @Body() body: CreateManagementServiceDto,
  ) {
    const ourService = await this.managementService.createManagementService(
      logo,
      body,
    );
    return {
      message: 'The service created successfully.',
      data: ourService,
    };
  }

  @ApiOperation({ summary: 'Get All Managements' })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const services = await this.managementService.findAllByAdmin(q);
    return {
      message: 'Our service list get successfully',
      data: services,
    };
  }

  @ApiOperation({ summary: 'Get A Management' })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully fetched',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const management = await this.managementService.findOneByAdmin(id);
    return {
      message: 'Management details get successfully',
      data: management,
    };
  }

  @ApiOperation({ summary: 'Update A Management' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Put('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      imageOptions,
    ),
  )
  async update(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
    @Body() updateDto: UpdateManagementDto,
  ) {
    const management = await this.managementService.updateByAdmin(
      id,
      files,
      updateDto,
    );
    return {
      message: 'Management updated successfully',
      data: management,
    };
  }

  @ApiOperation({ summary: 'Delete A Management' })
  @ApiResponse({
    status: 201,
    description: 'Management has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const management = await this.managementService.remove(id);
    return {
      message: 'Management deleted successfully',
      data: management,
    };
  }
}

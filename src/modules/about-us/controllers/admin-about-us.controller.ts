import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CreateAboutUsDto } from '../dto/create-about-us.dto';
import { Pagination } from 'src/common/pagination';
import { AboutUsService } from '../about-us.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { UpdateAboutUsDto } from '../dto/update-about-us.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('About us')
@Controller('/admin/about-us')
export class AdminAboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  // post requests
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create A Partner' })
  @ApiBody({
    type: CreateAboutUsDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAboutUsDto: CreateAboutUsDto,
  ) {
    const data = await this.aboutUsService.create(file, createAboutUsDto);
    return {
      message: 'About us created successfully',
      data: data,
    };
  }

  // get requests
  @Get('/')
  @ApiOperation({ summary: 'Get all Partner' })
  @ApiResponse({
    status: 200,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  async findAll(@Query() q: Pagination) {
    const data = await this.aboutUsService.findAllByAdmin(q);
    return {
      message: 'About us list get successfully',
      data: data,
    };
  }

  // get requests by id
  @Get('/:id')
  @ApiOperation({ summary: 'Get Partner details' })
  @ApiResponse({
    status: 200,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  async findOne(@Param('id') id: string) {
    const data = await this.aboutUsService.findOneByAdmin(id);
    return {
      message: 'About us details successfully',
      data: data,
    };
  }
  // update about us
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Partner' })
  @ApiResponse({
    status: 200,
    description: 'Partner has been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Something Went Wrong',
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async update(
    @Param('/:id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDto: UpdateAboutUsDto,
  ) {
    const data = await this.aboutUsService.updateByAdmin(id, file, updateDto);
    return {
      message: 'About us updated successfully',
      data: data,
    };
  }
}

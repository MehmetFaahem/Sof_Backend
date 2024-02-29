import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import { Pagination } from 'src/common/pagination';
import { CreateHeroSectionDto } from '../dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from '../dto/update-hero-section.dto';
import { HeroSectionService } from '../hero-section.service';

@ApiTags('Hero section')
@ApiResponse({
  status: 201,
  description: 'Partner has been successfully created.',
})
@ApiResponse({
  status: 404,
  description: 'Something Went Wrong',
})
// parent api for request handling
@Controller('admin/hero-section')
export class AdminHeroSectionController {
  // create constructor for class
  constructor(private readonly heroSecService: HeroSectionService) {}

  // Create Api for hero section
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateHeroSectionDto,
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateHeroSectionDto,
  ) {
    const data = await this.heroSecService.create(file, createDto);
    return {
      message: 'Hero section created successfully.',
      data: data,
    };
  }

  // get all hero section by pagination
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const data = await this.heroSecService.findAllByAdmin(q);
    return {
      message: 'get hero section data successfully',
      data: data,
    };
  }

  // get hero section details by Id
  @Get('/:id')
  async getOne(@Param() id: string) {
    const data = await this.heroSecService.findOne(id);
    return {
      message: 'get hero section data successfully',
      data: data,
    };
  }

  // update hero section data by given Id
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateHeroSectionDto,
  })
  @UseInterceptors(FileInterceptor('image', imageOptions))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDto: UpdateHeroSectionDto,
  ) {
    const data = await this.heroSecService.updateByAdmin(id, file, updateDto);
    return {
      message: 'get hero section data successfully',
      data: data,
    };
  }

  // update hero section data by given Id
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.heroSecService.removeByAdmin(id);
    return {
      message: 'get hero section data successfully',
      data: data,
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  Put,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { PartnersService } from '../partners.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { Pagination } from 'src/common/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreatePartnerDescriptionDto } from '../dto/create-partner-description.dto';
import { UpdatePartnerDescriptionDto } from '../dto/update-partner-description.dto';

@ApiTags('Trusted company')
@ApiResponse({
  status: 201,
  description: 'Trusted company has been created successfully.',
})
@ApiResponse({
  status: 400,
  description: 'title should not be empty',
})
@Controller('admin/trusted-company')
export class AdminPartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create trusted company description' })
  @ApiBody({
    type: CreatePartnerDescriptionDto,
  })
  async create(@Body() createDto: CreatePartnerDescriptionDto) {
    const data = await this.partnersService.create(createDto);
    return {
      message: 'Partners description created successfully',
      data: data,
    };
  }

  @Post('/partner')
  // Api Consume for file uploading
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a partner' })
  @ApiBody({
    type: CreatePartnerDto,
  })
  @UseInterceptors(FileInterceptor('logo', imageOptions))
  async createPartner(
    @UploadedFile() logo: Express.Multer.File,
    @Body() createDto: CreatePartnerDto,
  ) {
    const data = await this.partnersService.createPartner(logo, createDto);
    return {
      message: 'Partners created successfully',
      data: data,
    };
  }

  @Put('/')
  @ApiOperation({ summary: 'Update trusted company description' })
  @ApiBody({
    type: UpdatePartnerDescriptionDto,
  })
  async updateDescription(@Body() dto: UpdatePartnerDescriptionDto) {
    const data = await this.partnersService.updateDescription(dto);
    return {
      message: 'Partners description updated successfully',
      data: data,
    };
  }

  @ApiOperation({ summary: 'Get all trusted company list with partners' })
  @Get('/')
  async findAll(@Query() q: Pagination) {
    const partners = await this.partnersService.findAllByAdmin(q);
    return {
      message: 'Our partners list get successfully',
      data: partners,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a partner from a partners list' })
  async remove(@Param('id') id: string) {
    const data = await this.partnersService.remove(id);
    return {
      message: 'Our partners removed successfully',
      data: data,
    };
  }
}

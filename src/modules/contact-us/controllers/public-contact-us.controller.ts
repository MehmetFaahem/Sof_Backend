import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { allFileTypeOptions } from 'src/common/decorator/custom-validation.decorator';
import { ContactUsService } from '../contact-us.service';
import { CreateContactUsDto } from '../dto/create-contact-us.dto';

@ApiTags('Contact us')
@ApiResponse({
  status: 200,
  description: 'Contact us has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'full_name should not be empty',
})
@Controller('public/contact-us')
export class PublicContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Contact us form' })
  @ApiBody({
    type: CreateContactUsDto,
  })
  @UseInterceptors(FileInterceptor('attached_file', allFileTypeOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateContactUsDto,
  ) {
    const data = await this.contactUsService.create(file, createDto);
    return {
      message: 'We are receiving your feedback. Thank you for connect with us',
      data: data,
    };
  }
}

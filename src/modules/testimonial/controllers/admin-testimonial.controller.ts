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
import { TestimonialService } from '../testimonial.service';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTestimonialReviewDto } from '../dto/create-testimonial-review.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/common/decorator/custom-validation.decorator';

@ApiTags('Testimonial')
@ApiResponse({
  status: 200,
  description: 'Testimonial has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title filed should not be empty',
})
@Controller('admin/testimonial')
export class AdminTestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create testimonial' })
  @ApiBody({
    type: CreateTestimonialDto,
  })
  async create(@Body() createDto: CreateTestimonialDto) {
    const data = await this.testimonialService.create(createDto);
    return {
      message: 'Testimonial created successfully',
      data: data,
    };
  }

  @Post('/review')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create testimonial' })
  @ApiBody({
    type: CreateTestimonialReviewDto,
  })
  @UseInterceptors(FileInterceptor('avatar', imageOptions))
  async createReview(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateTestimonialReviewDto,
  ) {
    const data = await this.testimonialService.createReview(file, createDto);
    return {
      message: 'Testimonial review added successfully',
      data: data,
    };
  }

  @Delete('/review/:id')
  @ApiOperation({ summary: 'Delete Review' })
  async deleteReview(@Param('id') id: string) {
    const data = await this.testimonialService.deleteReview(id);
    return {
      message: 'Testimonial review deleted successfully',
      data: data,
    };
  }

  @Get('/')
  async findAllByAdmin() {
    const data = await this.testimonialService.findAllByAdmin();
    return {
      message: 'Testimonial get successfully',
      data: data,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.testimonialService.findOneByAdmin(id);
    return {
      message: 'Testimonial get successfully',
      data: data,
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTestimonialDto,
  ) {
    const data = await this.testimonialService.updateByAdmin(id, updateDto);
    return {
      message: 'Testimonial updated successfully',
      data: data,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const data = await this.testimonialService.removeByAdmin(id);
    return {
      message: 'Testimonial deleted successfully',
      data: data,
    };
  }
}

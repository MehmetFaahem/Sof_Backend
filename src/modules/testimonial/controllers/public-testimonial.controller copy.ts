import { Controller, Get, Param } from '@nestjs/common';
import { TestimonialService } from '../testimonial.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Testimonial')
@ApiResponse({
  status: 200,
  description: 'Testimonial has been successfully created.',
})
@ApiResponse({
  status: 400,
  description: 'title filed should not be empty',
})
@Controller('public/testimonial')
export class PublicTestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Get('/')
  async findAll() {
    const data = await this.testimonialService.findAllByPublic();
    return {
      message: 'Testimonial get successfully',
      data: data,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.testimonialService.findOneByPublic(id);
    return {
      message: 'Testimonial get successfully',
      data: data,
    };
  }
}

import { Module } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { PublicTestimonialController } from './controllers/public-testimonial.controller copy';
import { MongooseModule } from '@nestjs/mongoose';
import { Testimonial, TestimonialSchema } from './entities/testimonial.entity';
import { AdminTestimonialController } from './controllers/admin-testimonial.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Testimonial.name, schema: TestimonialSchema },
    ]),
  ],
  controllers: [AdminTestimonialController, PublicTestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}

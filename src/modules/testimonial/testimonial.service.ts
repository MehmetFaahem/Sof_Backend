import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTestimonialReviewDto } from './dto/create-testimonial-review.dto';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import {
  Testimonial,
  TestimonialDocument,
} from './entities/testimonial.entity';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectModel(Testimonial.name)
    private testModel: Model<TestimonialDocument>,
  ) {}

  public async create(createDto: CreateTestimonialDto) {
    const exists = await this.testModel.findOne({}).select(['_id']);
    if (exists)
      throw new BadRequestException('Already a testimonial section added');
    const testimonial = await this.testModel.create(createDto);
    await testimonial.save();
    return testimonial;
  }

  public async createReview(
    file: Express.Multer.File,
    createDto: CreateTestimonialReviewDto,
  ) {
    const exists = await this.testModel.findOne({}).select(['_id']);
    if (!exists)
      throw new BadRequestException(
        'You need to add testimonial section before adding review',
      );
    await this.testModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          reviews: {
            ...createDto,
            avatar: file.filename,
          },
        },
      },
    );
    return exists;
  }

  public async deleteReview(id: string) {
    const exists = await this.testModel
      .findOne({ 'reviews._id': id })
      .select(['_id']);
    if (!exists)
      throw new BadRequestException(
        'You need to add testimonial section before adding review',
      );
    await this.testModel.updateOne(
      {
        'reviews._id': id,
      },
      {
        $pull: { reviews: { _id: id } },
      },
    );
    return exists;
  }

  public async findAllByAdmin() {
    const data = await this.testModel.findOne({});
    return data;
  }

  public async findAllByPublic() {
    const data = await this.testModel
      .findOne({})
      .select(['_id', 'title', 'sub_title', 'content', 'reviews']);
    return data;
  }

  public async findOneByAdmin(id: string) {
    const data = await this.testModel.findOne({ _id: id });
    if (!data) throw new BadRequestException('Invalid testimonial id');
    return data;
  }

  public async findOneByPublic(id: string) {
    const data = await this.testModel
      .findOne({ _id: id })
      .select(['_id', 'title', 'sub_title', 'content', 'reviews']);
    if (!data) throw new BadRequestException('Invalid testimonial id');
    return data;
  }

  public async updateByAdmin(id: string, updateDto: UpdateTestimonialDto) {
    const testimonial = await this.testModel
      .findOne({ _id: id })
      .select(['_id', 'title', 'sub_title', 'content']);
    if (!testimonial) throw new BadRequestException('Invalid testimonial id');
    Object.keys(updateDto).forEach((key) => {
      testimonial[key] = updateDto[key];
    });
    await testimonial.save();
    return testimonial;
  }

  public async removeByAdmin(id: string) {
    const testimonial = await this.testModel
      .findOne({ _id: id })
      .select(['_id', 'title', 'sub_title', 'content', 'reviews']);
    if (!testimonial) throw new BadRequestException('Invalid testimonial id');
    await testimonial.remove();
    return testimonial;
  }
}

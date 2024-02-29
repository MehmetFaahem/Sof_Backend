import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema()
export class Review {
  @Prop({
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  })
  author: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    trim: true,
  })
  content: string;

  @Prop({
    required: true,
    type: String,
  })
  avatar: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    trim: true,
  })
  location: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    trim: true,
  })
  designation: string;

  @Prop({
    required: true,
    type: Number,
    default: 0,
  })
  rating: number;
}
const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'testimonials',
})
export class Testimonial {
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  title: string;

  @Prop({
    required: [true, 'sub_title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  sub_title: string;

  @Prop({
    required: [true, 'content should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  content: string;

  @Prop({
    required: true,
    type: [ReviewSchema],
    default: [],
  })
  reviews: Review[];
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);

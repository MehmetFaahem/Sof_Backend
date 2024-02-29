import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AboutUsStatus } from '../enums';

export type AboutUsDocument = AboutUs & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'about_us',
})
export class AboutUs {
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  title: string;

  @Prop({
    required: [true, 'subtitle should not be empty'],
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
    required: [true, 'image should not be empty'],
    type: String,
    trim: true,
  })
  image: string;

  @Prop({
    required: [true, 'video should not be empty'],
    type: String,
    trim: true,
  })
  video: string;

  @Prop({
    required: [true, 'total_project should not be empty'],
    type: Number,
    default: 0,
  })
  total_project: number;

  @Prop({
    required: [true, 'total_project_text should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  total_project_text: string;

  @Prop({
    required: [true, 'team_member should not be empty'],
    type: Number,
    default: 0,
  })
  team_member: number;

  @Prop({
    required: [true, 'team_member_text should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  team_member_text: string;

  @Prop({
    required: [true, 'rating should not be empty'],
    type: Number,
    trim: true,
    lowercase: true,
  })
  rating: number;

  @Prop({
    required: [true, 'rating_text should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  rating_text: string;

  @Prop({
    required: [true, 'status should not be empty'],
    type: String,
    enum: AboutUsStatus,
    default: AboutUsStatus.ACTIVE,
  })
  status: AboutUsStatus;
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);

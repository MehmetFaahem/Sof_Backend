import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HeroSectionStatus } from '../enums';

// create and export type for hero section schema
export type HeroSectionDocument = HeroSection & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'hero_section',
})
export class HeroSection {
  // Image field will be required
  @Prop({
    required: [true, 'image should not be empty'],
    type: String,
  })
  image: string;

  // Title field will be required
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  title: string;

  // Subtitle field will be required
  @Prop({
    required: [true, 'sub_title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  sub_title: string;

  // Content field will be required
  @Prop({
    required: [true, 'content should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  content: string;

  @Prop({
    required: [true, 'status should not be empty'],
    type: String,
    enum: HeroSectionStatus,
    default: HeroSectionStatus.ACTIVE,
  })
  status: HeroSectionStatus;
}

// export hero section schema
export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);

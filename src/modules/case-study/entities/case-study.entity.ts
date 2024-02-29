import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseStudyDocument = CaseStudy & Document;

@Schema()
export class CaseStudyProject {
  @Prop({
    type: String,
    trim: true,
  })
  thumbnail: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  sub_title: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  category: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
  })
  content: string;
}
const CaseStudyProjectSchema = SchemaFactory.createForClass(CaseStudyProject);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'case_studies',
})
export class CaseStudy {
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
    required: [false, 'project_descriptions should not be empty'],
    type: [CaseStudyProjectSchema],
    default: [],
  })
  projects: CaseStudyProject[];
}

export const CaseStudySchema = SchemaFactory.createForClass(CaseStudy);

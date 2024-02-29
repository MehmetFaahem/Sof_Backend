import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JonOpeningDocument = JonOpening & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'jon_openings',
})
export class JonOpening {
  @Prop({
    required: [true, 'job_title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  job_title: string;

  @Prop({
    required: [true, 'job_category should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  job_category: string;

  @Prop({
    required: [true, 'job_type should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  job_type: string;

  @Prop({
    required: [true, 'apply_deadline should not be empty'],
    type: Date,
    default: function () {
      const date = new Date();
      date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
      return date;
    },
  })
  apply_deadline: Date;
}

export const JonOpeningSchema = SchemaFactory.createForClass(JonOpening);

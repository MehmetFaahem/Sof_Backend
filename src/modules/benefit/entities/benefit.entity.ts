import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BenefitDocument = Benefit & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'benefits',
})
export class Benefit {
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  title: string;

  @Prop({
    required: [true, 'content should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  content: string;

  @Prop({
    required: [true, 'logo should not be empty'],
    type: String,
    trim: true,
  })
  logo: string;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);

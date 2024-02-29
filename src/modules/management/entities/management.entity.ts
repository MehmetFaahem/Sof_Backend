import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ManagementDocument = Management & Document;

@Schema()
export class ManagementService {
  @Prop({ type: String })
  logo: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;
}
// Generate a Mongoose Schema before use as Subdocument
const ManagementServiceSchema = SchemaFactory.createForClass(ManagementService);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'managements',
})
export class Management {
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
  })
  title: string;

  @Prop({
    required: [true, 'subtitle should not be empty'],
    type: String,
  })
  sub_title: string;

  @Prop({
    required: [true, 'content should not be empty'],
    type: String,
  })
  content: string;

  @Prop({
    required: [true, 'thumbnail should not be empty'],
    type: String,
  })
  thumbnail: string;

  @Prop({
    required: [true, 'image should not be empty'],
    type: String,
  })
  image: string;

  @Prop({
    required: [false, 'services should not be empty'],
    type: [ManagementServiceSchema],
    default: [],
  })
  services: ManagementService[];
}

export const ManagementSchema = SchemaFactory.createForClass(Management);

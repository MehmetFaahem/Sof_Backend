import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ServiceStatus } from '../enums';
import { Document, Schema as mongooseSchema } from 'mongoose';

export type OurServiceDocument = OurServices & Document;

@Schema()
export class OurServicesProject {
  @Prop({ type: String })
  logo: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;
}
const OurServicesProjectSchema =
  SchemaFactory.createForClass(OurServicesProject);

@Schema()
export class OurServicesProjectDescription {
  @Prop({ type: String })
  thumbnail: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: [String] })
  project_name: string[];
}
const OurServicesProjectDescriptionSchema = SchemaFactory.createForClass(
  OurServicesProjectDescription,
);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'our_services',
})
export class OurServices {
  @Prop({
    required: [false, 'title should not be empty'],
    type: String,
  })
  title: string;

  @Prop({
    required: [false, 'subtitle should not be empty'],
    type: String,
  })
  sub_title: string;

  @Prop({
    required: [false, 'content should not be empty'],
    type: String,
  })
  content: string;

  @Prop({
    required: [false, 'projects should not be empty'],
    type: [OurServicesProjectSchema],
    default: [],
  })
  projects: OurServicesProject[];

  @Prop({
    required: [false, 'project_descriptions should not be empty'],
    type: [OurServicesProjectDescriptionSchema],
    default: [],
  })
  project_descriptions: OurServicesProjectDescription[];

  @Prop({
    required: [false, 'status should not be empty'],
    type: String,
    enum: ServiceStatus,
    default: ServiceStatus.ACTIVE,
  })
  status: ServiceStatus;
}

export const OurServiceSchema = SchemaFactory.createForClass(OurServices);

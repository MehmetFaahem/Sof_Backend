import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OurPlanStatus } from '../enums';

export type OurPlanDocument = OurPlan & Document;

@Schema()
export class PackageService {
  @Prop({
    type: String,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  price: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  currency: string;
}
const PlanServiceSchema = SchemaFactory.createForClass(PackageService);

@Schema()
export class Package {
  @Prop({
    type: String,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
  })
  icon: string;

  @Prop({
    required: true,
    type: [PlanServiceSchema],
    default: [],
  })
  package_services: PackageService[];
}
const PlansSchema = SchemaFactory.createForClass(Package);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'our_plans',
})
export class OurPlan {
  @Prop({
    required: [true, 'title should not be empty'],
    type: String,
    lowercase: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: [true, 'subtitle should not be empty'],
    type: String,
    lowercase: true,
    trim: true,
  })
  sub_title: string;

  @Prop({
    required: [true, 'content should not be empty'],
    type: String,
    lowercase: true,
    trim: true,
  })
  content: string;

  @Prop({
    required: [true, 'status should not be empty'],
    type: String,
    enum: OurPlanStatus,
    default: OurPlanStatus.ACTIVE,
  })
  status: OurPlanStatus;

  @Prop({
    required: [false, 'members should not be empty'],
    type: [PlansSchema],
    default: [],
  })
  packages: Package[];
}
export const OurPlanSchema = SchemaFactory.createForClass(OurPlan);

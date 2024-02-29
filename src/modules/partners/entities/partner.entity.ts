import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PartnerStatus } from '../enums';

export type TrustedCompanyDocument = TrustedCompany & Document;

@Schema()
export class Partner {
  @Prop({
    required: [true, 'company_name should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  company_name: string;

  @Prop({
    required: [true, 'slug should not be empty'],
    type: String,
    lowercase: true,
    unique: true,
    default: function () {
      return this.company_name
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove all non-alphanumeric characters
        .replace(/\s+/g, '-') // Replace all white space with a hyphen
        .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
        .trim(); // Remove any leading or trailing hyphens
    },
  })
  slug: string;

  @Prop({
    required: [true, 'logo should not be empty'],
    type: String,
  })
  logo: string;

  @Prop({
    required: [true, 'alt should not be empty'],
    type: String,
    trim: true,
    lowercase: true,
  })
  alt: string;

  @Prop({
    required: [true, 'status should not be empty'],
    type: String,
    enum: PartnerStatus,
    default: PartnerStatus.ACTIVE,
  })
  status: PartnerStatus;
}
const PartnerSchema = SchemaFactory.createForClass(Partner);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'trusted_companies',
})
export class TrustedCompany {
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
    required: true,
    type: [PartnerSchema],
    default: [],
  })
  partners: Partner[];
}

export const TrustedCompanySchema =
  SchemaFactory.createForClass(TrustedCompany);

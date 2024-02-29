import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContactUsDocument = ContactUs & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'contact_us',
})
export class ContactUs {
  @Prop({
    required: [true, 'full_name should not be empty'],
    type: String,
    trim: true,
  })
  full_name: string;

  @Prop({
    required: [true, 'email should not be empty'],
    type: String,
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, 'contact_no should not be empty'],
    type: String,
    trim: true,
  })
  contact_no: string;

  @Prop({
    required: [true, 'facebook_link should not be empty'],
    type: String,
    trim: true,
    default: null,
  })
  facebook_link: string;

  @Prop({
    required: [true, 'message should not be empty'],
    type: String,
    trim: true,
    default: null,
  })
  message: string;

  @Prop({
    required: [false, 'attached_file should not be empty'],
    type: String,
    default: null,
  })
  attached_file: string;

  @Prop({
    required: [true, 'budget should not be empty'],
    type: Number,
    default: 0,
  })
  budget: number;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);

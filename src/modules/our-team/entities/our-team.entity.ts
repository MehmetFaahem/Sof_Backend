import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TeamStatus } from '../enums';

export type OurTeamDocument = OurTeam & Document;

export class SocialLinks {
  @Prop({
    type: String,
    required: true,
  })
  facebook_link: string;

  @Prop({
    type: String,
    required: true,
  })
  twitter_link: string;

  @Prop({
    type: String,
    required: true,
  })
  linkedin_link: string;
}

@Schema()
export class OurTeamMember {
  @Prop({
    type: String,
    lowercase: true,
    trim: true,
  })
  full_name: string;

  @Prop({
    required: true,
    type: String,
    lowercase: true,
    trim: true,
  })
  designation: string;

  @Prop({
    required: true,
    type: String,
  })
  image: string;

  @Prop({
    required: [
      true,
      'social_links facebook_link/twitter_link/linkedin_link one them should not be empty',
    ],
    type: SocialLinks,
  })
  social_links: SocialLinks;
}
const OurTeamMemberSchema = SchemaFactory.createForClass(OurTeamMember);

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'our_team',
})
export class OurTeam {
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
    enum: TeamStatus,
    default: TeamStatus.ACTIVE,
  })
  status: TeamStatus;

  @Prop({
    required: [false, 'members should not be empty'],
    type: [OurTeamMemberSchema],
    default: [],
  })
  members: OurTeamMember[];
}

export const OurTeamSchema = SchemaFactory.createForClass(OurTeam);

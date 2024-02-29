import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOurTeamMemberDto } from './create-our-team-member.dto';

export class UpdateOurTeamMemberDto extends PartialType(
  CreateOurTeamMemberDto,
) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  our_member_id: string;
}

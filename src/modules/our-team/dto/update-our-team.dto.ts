import { PartialType } from '@nestjs/swagger';
import { CreateOurTeamDto } from './create-our-team.dto';

export class UpdateOurTeamDto extends PartialType(CreateOurTeamDto) {}

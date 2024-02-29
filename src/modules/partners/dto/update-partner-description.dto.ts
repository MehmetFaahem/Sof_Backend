import { PartialType } from '@nestjs/swagger';
import { CreatePartnerDescriptionDto } from './create-partner-description.dto';

export class UpdatePartnerDescriptionDto extends PartialType(
  CreatePartnerDescriptionDto,
) {}

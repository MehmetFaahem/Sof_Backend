import { PartialType } from '@nestjs/swagger';
import { CreateOurPlanDto } from './create-our-plan.dto';

export class UpdateOurPlanDto extends PartialType(CreateOurPlanDto) {}

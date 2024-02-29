import { PartialType } from '@nestjs/swagger';
import { CreateOurPlanPackageDto } from './create-our-plan-package.dto';

export class UpdateOurPlanPackageDto extends PartialType(
  CreateOurPlanPackageDto,
) {}

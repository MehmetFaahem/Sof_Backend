import { Module } from '@nestjs/common';
import { OurPlanService } from './our-plan.service';
import { AdminOurPlanController } from './controllers/admin-our-plan.controller';
import { PublicOurPlanController } from './controllers/public-our-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OurPlan, OurPlanSchema } from './entities/our-plan.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OurPlan.name, schema: OurPlanSchema }]),
  ],
  controllers: [AdminOurPlanController, PublicOurPlanController],
  providers: [OurPlanService],
  exports: [OurPlanService],
})
export class OurPlanModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenefitService } from './benefit.service';
import { AdminBenefitController } from './controllers/admin-benefit.controller';
import { PublicBenefitController } from './controllers/public-benefit.controller copy';
import { Benefit, BenefitSchema } from './entities/benefit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Benefit.name,
        schema: BenefitSchema,
      },
    ]),
  ],
  controllers: [AdminBenefitController, PublicBenefitController],
  providers: [BenefitService],
  exports: [BenefitService],
})
export class BenefitModule {}

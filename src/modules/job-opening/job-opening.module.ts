import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminJobOpeningController } from './controllers/admin-job-opening.controller';
import { PublicJobOpeningController } from './controllers/public-job-opening.controller';
import { JonOpening, JonOpeningSchema } from './entities/job-opening.entity';
import { JobOpeningService } from './job-opening.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JonOpening.name, schema: JonOpeningSchema },
    ]),
  ],
  controllers: [AdminJobOpeningController, PublicJobOpeningController],
  providers: [JobOpeningService],
  exports: [JobOpeningService],
})
export class JobOpeningModule {}

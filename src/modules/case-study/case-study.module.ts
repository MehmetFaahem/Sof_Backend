import { Module } from '@nestjs/common';
import { CaseStudyService } from './case-study.service';
import { AdminCaseStudyController } from './controllers/admin-case-study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseStudy, CaseStudySchema } from './entities/case-study.entity';
import { PublicCaseStudyController } from './controllers/public-case-study.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CaseStudy.name, schema: CaseStudySchema },
    ]),
  ],
  controllers: [AdminCaseStudyController, PublicCaseStudyController],
  providers: [CaseStudyService],
  exports: [CaseStudyService],
})
export class CaseStudyModule {}

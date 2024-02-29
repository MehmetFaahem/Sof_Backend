import { Test, TestingModule } from '@nestjs/testing';
import { CaseStudyService } from './case-study.service';

describe('CaseStudyService', () => {
  let service: CaseStudyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseStudyService],
    }).compile();

    service = module.get<CaseStudyService>(CaseStudyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

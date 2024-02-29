import { Test, TestingModule } from '@nestjs/testing';
import { OurPlanService } from './our-plan.service';

describe('OurPlanService', () => {
  let service: OurPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurPlanService],
    }).compile();

    service = module.get<OurPlanService>(OurPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OurPlanController } from './controllers/admin-our-plan.controller';
import { OurPlanService } from './our-plan.service';

describe('OurPlanController', () => {
  let controller: OurPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurPlanController],
      providers: [OurPlanService],
    }).compile();

    controller = module.get<OurPlanController>(OurPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

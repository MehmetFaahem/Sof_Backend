import { Test, TestingModule } from '@nestjs/testing';
import { JobOpeningController } from './controllers/admin-job-opening.controller';
import { JobOpeningService } from './job-opening.service';

describe('JobOpeningController', () => {
  let controller: JobOpeningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobOpeningController],
      providers: [JobOpeningService],
    }).compile();

    controller = module.get<JobOpeningController>(JobOpeningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { JobOpeningService } from './job-opening.service';

describe('JobOpeningService', () => {
  let service: JobOpeningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobOpeningService],
    }).compile();

    service = module.get<JobOpeningService>(JobOpeningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

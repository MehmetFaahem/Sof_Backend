import { Test, TestingModule } from '@nestjs/testing';
import { OurServicesService } from './our-services.service';

describe('OurServicesService', () => {
  let service: OurServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurServicesService],
    }).compile();

    service = module.get<OurServicesService>(OurServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

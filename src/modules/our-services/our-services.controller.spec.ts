import { Test, TestingModule } from '@nestjs/testing';
import { OurServicesController } from './controllers/admin-our-services.controller';
import { OurServicesService } from './our-services.service';

describe('OurServicesController', () => {
  let controller: OurServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurServicesController],
      providers: [OurServicesService],
    }).compile();

    controller = module.get<OurServicesController>(OurServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

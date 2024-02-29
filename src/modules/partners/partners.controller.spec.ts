import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from './partners.service';
import { AdminPartnersController } from './controllers/admin-partners.controller';

describe('PartnersController', () => {
  let controller: AdminPartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPartnersController],
      providers: [PartnersService],
    }).compile();

    controller = module.get<AdminPartnersController>(AdminPartnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

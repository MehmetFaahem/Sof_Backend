import { Test, TestingModule } from '@nestjs/testing';
import { AdminManagementController } from './controllers/admin-management.controller';
import { ManagementService } from './management.service';

describe('ManagementController', () => {
  let controller: AdminManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminManagementController],
      providers: [ManagementService],
    }).compile();

    controller = module.get<AdminManagementController>(
      AdminManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

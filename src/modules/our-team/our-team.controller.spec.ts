import { Test, TestingModule } from '@nestjs/testing';
import { AdminOurTeamController } from './controllers/admin-our-team.controller';
import { OurTeamService } from './our-team.service';

describe('OurTeamController', () => {
  let controller: AdminOurTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminOurTeamController],
      providers: [OurTeamService],
    }).compile();

    controller = module.get<AdminOurTeamController>(AdminOurTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

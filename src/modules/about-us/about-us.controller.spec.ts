import { Test, TestingModule } from '@nestjs/testing';
import { AboutUsService } from './about-us.service';
import { PublicAboutUsController } from './controllers/public-about-us.controller';

describe('PublicAboutUsController', () => {
  let controller: PublicAboutUsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicAboutUsController],
      providers: [AboutUsService],
    }).compile();

    controller = module.get<PublicAboutUsController>(PublicAboutUsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

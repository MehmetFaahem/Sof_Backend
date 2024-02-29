import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutUs, AboutUsSchema } from './entities/about-us.entity';
import { AdminAboutUsController } from './controllers/admin-about-us.controller';
import { PublicAboutUsController } from './controllers/public-about-us.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AboutUs.name, schema: AboutUsSchema }]),
  ],
  controllers: [AdminAboutUsController, PublicAboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService],
})
export class AboutUsModule {}

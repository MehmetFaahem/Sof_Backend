import { Module } from '@nestjs/common';
import { HeroSectionService } from './hero-section.service';
import { AdminHeroSectionController } from './controllers/admin-hero-section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSection, HeroSectionSchema } from './entities/hero-section.entity';
import { PublicHeroSectionController } from './controllers/public-hero-section.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HeroSection.name,
        schema: HeroSectionSchema,
      },
    ]),
  ],
  controllers: [AdminHeroSectionController, PublicHeroSectionController],
  providers: [HeroSectionService],
  exports: [HeroSectionService],
})
export class HeroSectionModule {}

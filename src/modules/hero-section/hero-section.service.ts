import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import {
  HeroSection,
  HeroSectionDocument,
} from './entities/hero-section.entity';

@Injectable()
export class HeroSectionService {
  // create a constructor for this class
  constructor(
    @InjectModel(HeroSection.name)
    private heroSecModel: Model<HeroSectionDocument>,
  ) {}

  async create(file: Express.Multer.File, createDto: CreateHeroSectionDto) {
    const newHeroSection = await this.heroSecModel.create({
      ...createDto,
      image: file.filename,
    });
    await newHeroSection.save();
    return newHeroSection;
  }

  async findAllByPublic(q: Pagination) {
    const heroData = await this.heroSecModel
      .find({})
      // .skip((q.page - 1) * q.limit)
      // .limit(q.limit)
      .sort({ created_at: -1 });
    // .select(['image', 'title', 'subtitle', 'content']);
    return heroData;
  }

  async findAllByAdmin(q: Pagination) {
    const heroData = await this.heroSecModel.find({}).sort({ created_at: -1 });
    // .select(['image', 'title', 'subtitle', 'content']);
    return heroData;
  }
  async findOne(id: string) {
    const exists = await this.heroSecModel
      .findOne({ _id: id })
      .sort({ created_at: -1 });
    // .select(['image', 'title', 'subtitle', 'content']);
    if (!exists) throw new BadRequestException('Invalid id provided.');
    return exists;
  }

  async updateByAdmin(
    id: string,
    file: Express.Multer.File,
    updateDto: UpdateHeroSectionDto,
  ) {
    const exists = await this.heroSecModel.findOne({ _id: id });
    // .select(['image', 'title', 'subtitle', 'content']);
    if (!exists) throw new BadRequestException('Invalid id provided.');
    Object.keys(updateDto).forEach((key) => {
      exists[key] = updateDto[key];
    });
    if (file) exists.image = file.filename;
    await exists.save();
    return exists;
  }

  async removeByAdmin(id: string) {
    const exists = await this.heroSecModel.findOne({ _id: id });
    // .select(['image', 'title', 'subtitle', 'content']);
    if (!exists) throw new BadRequestException('Invalid id provided.');
    await exists.remove();
    return exists;
  }
}

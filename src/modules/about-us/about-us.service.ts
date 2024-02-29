import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { AboutUs, AboutUsDocument } from './entities/about-us.entity';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUsDocument>,
  ) {}

  async create(file: Express.Multer.File, createDto: CreateAboutUsDto) {
    const newAboutUs = await this.aboutUsModel.create({
      ...createDto,
      image: file.filename,
    });
    await newAboutUs.save();
    return newAboutUs;
  }

  async findAllByPublic(q: Pagination) {
    const about_us_data = await this.aboutUsModel
      .find({})
      .sort({ created_at: -1 })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
        '-_id',
      ]);
    return about_us_data;
  }

  async findAllByAdmin(q: Pagination) {
    const about_us_data = await this.aboutUsModel
      .find({})
      .sort({ created_at: -1 })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
      ]);
    return about_us_data;
  }

  async findOneByPublic(slug: string) {
    const about_us_data = await this.aboutUsModel
      .findOne({ slug: slug })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
        '-_id',
      ]);
    return about_us_data;
  }

  async findOneByAdmin(id: string) {
    const about_us_data = await this.aboutUsModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
        '-_id',
      ]);
    return about_us_data;
  }

  async updateByAdmin(
    id: string,
    file: Express.Multer.File,
    updateDto: UpdateAboutUsDto,
  ) {
    const exists = await this.aboutUsModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
      ]);
    if (!exists) throw new BadRequestException('Invalid id provided.');
    Object.keys(updateDto).forEach((key) => {
      exists[key] = updateDto[key];
    });
    if (file) exists.image = file.filename;
    await exists.save();
    return exists;
  }

  async removeByAdmin(id: number) {
    const exists = await this.aboutUsModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'image',
        'video',
        'total_project',
        'total_project_text',
        'team_member',
        'team_member_text',
        'rating',
        'rating_text',
      ]);
    if (!exists) throw new BadRequestException('Invalid id provided.');
    await exists.remove();
    return exists;
  }
}

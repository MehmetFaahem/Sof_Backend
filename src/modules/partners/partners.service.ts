import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreatePartnerDescriptionDto } from './dto/create-partner-description.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDescriptionDto } from './dto/update-partner-description.dto';
import {
  TrustedCompany,
  TrustedCompanyDocument,
} from './entities/partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(TrustedCompany.name)
    private tcModel: Model<TrustedCompanyDocument>,
  ) {}

  async createPartner(file: Express.Multer.File, createDto: CreatePartnerDto) {
    const exists = await this.tcModel.findOne({}).select('_id');
    if (!exists)
      throw new BadRequestException(
        'You need to create partner description before inserting partner',
      );
    await this.tcModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          partners: {
            ...createDto,
            logo: file.filename,
          },
        },
      },
    );
    return exists;
  }

  async create(dto: CreatePartnerDescriptionDto) {
    const exists = await this.tcModel.findOne({}).select('_id');
    if (exists)
      throw new BadRequestException(
        'Already trusted company description added',
      );
    const des = await this.tcModel.create(dto);
    await des.save();
    return des;
  }

  async updateDescription(dto: UpdatePartnerDescriptionDto) {
    const exists = await this.tcModel
      .findOne({})
      .select(['_id', 'title', 'sub_title']);
    if (!exists)
      throw new BadRequestException(
        'No document exits for trusted company description',
      );
    Object.keys(dto).forEach((key) => {
      exists[key] = dto[key];
    });
    await this.tcModel.updateOne({ dto }, exists, {
      runValidators: true,
    });
    return exists;
  }

  async findAllByPublic(q: Pagination) {
    const partners = await this.tcModel
      .findOne({})
      .select([
        'title',
        'sub_title',
        'partners.company_name',
        'partners.logo',
        'partners.slug',
        'partners.alt',
        '-_id',
      ]);
    return partners;
  }

  async findAllByAdmin(q: Pagination) {
    const partners = await this.tcModel.findOne({});
    // .select(['company_name', 'logo', 'slug', 'alt', '-_id']);
    return partners;
  }

  async findOneByAdmin(slug: string) {
    const partner = await this.tcModel.findOne({ slug: slug });
    // .select(['company_name', 'logo', 'slug', 'alt', '-_id']);
    if (!partner) throw new BadRequestException('Invalid partner slug');
    return partner;
  }

  async remove(id: string) {
    const exists = await this.tcModel.findOne({ 'partners._id': id });
    if (!exists) throw new BadRequestException('Invalid slug provided.');
    await this.tcModel.updateOne(
      {
        'partners._id': id,
      },
      {
        $pull: { partners: { _id: id } },
      },
    );
    return exists;
  }
}

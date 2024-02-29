import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { Benefit, BenefitDocument } from './entities/benefit.entity';

@Injectable()
export class BenefitService {
  constructor(
    @InjectModel(Benefit.name) private benModel: Model<BenefitDocument>,
  ) {}

  public async create(file: Express.Multer.File, dto: CreateBenefitDto) {
    const benefit = await this.benModel.create({ ...dto, logo: file.filename });
    await benefit.save();
    return benefit;
  }

  public async findAllByAdmin() {
    const benefit = await this.benModel.find({}).sort({ _id: -1 });
    return benefit;
  }

  public async findAllByPublic() {
    const benefit = await this.benModel
      .find({})
      .sort({ _id: -1 })
      .limit(10)
      .select(['title', 'content', 'logo']);
    return benefit;
  }

  public async findOneByAdmin(id: string) {
    const benefit = await this.benModel.findOne({ _id: id });
    if (!benefit) throw new BadRequestException('Invalid benefit id');
    return benefit;
  }

  public async findOneByPublic(id: string) {
    const benefit = await this.benModel
      .findOne({ _id: id })
      .select(['title', 'content', 'logo']);
    if (!benefit) throw new BadRequestException('Invalid benefit id');
    return benefit;
  }

  public async updateByAdmin(
    id: string,
    file: Express.Multer.File,
    dto: UpdateBenefitDto,
  ) {
    const benefit = await this.benModel
      .findOne({ _id: id })
      .select(['title', 'content', 'logo']);
    if (!benefit) throw new BadRequestException('Invalid benefit id');
    Object.keys(dto).forEach((key) => {
      benefit[key] = dto[key];
    });
    if (file) benefit.logo = file.filename;
    await benefit.save();
    return benefit;
  }

  public async remove(id: string) {
    const benefit = await this.benModel
      .findOne({ _id: id })
      .select(['title', 'content', 'logo']);
    if (!benefit) throw new BadRequestException('Invalid benefit id');
    await benefit.remove();
    return benefit;
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateJobOpeningDto } from './dto/create-job-opening.dto';
import { UpdateJobOpeningDto } from './dto/update-job-opening.dto';
import { Model } from 'mongoose';
import { JonOpening, JonOpeningDocument } from './entities/job-opening.entity';

@Injectable()
export class JobOpeningService {
  constructor(
    @InjectModel(JonOpening.name) private joModel: Model<JonOpeningDocument>,
  ) {}

  async create(dto: CreateJobOpeningDto) {
    const position = await this.joModel.create(dto);
    await position.save();
    return position;
  }

  async findAllByAdmin() {
    const positions = await this.joModel.find({}).sort({ _id: -1 }).limit(20);
    return positions;
  }

  async findAllByPublic() {
    const positions = await this.joModel.find({}).sort({ _id: -1 }).limit(20);
    return positions;
  }

  async findOne(id: string) {
    const position = await this.joModel.findOne({ _id: id });
    if (!position) throw new BadRequestException('Invalid position id');
    return position;
  }

  async update(id: string, dto: UpdateJobOpeningDto) {
    const position = await this.joModel.findOne({ _id: id });
    if (!position) throw new BadRequestException('Invalid benefit id');
    Object.keys(dto).forEach((key) => {
      position[key] = dto[key];
    });
    await position.save();
    return position;
  }

  async remove(id: string) {
    const position = await this.joModel.findOne({ _id: id });
    if (!position) throw new BadRequestException('Invalid benefit id');
    await position.remove();
    return position;
  }
}

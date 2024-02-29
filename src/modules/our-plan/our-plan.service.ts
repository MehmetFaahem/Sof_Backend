import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOurPlanPackageDto } from './dto/create-our-plan-package.dto';
import { CreateOurPlanDto } from './dto/create-our-plan.dto';
import { CreateOurPlanPackageServiceDto } from './dto/create-ourplan-package-service.dto';
import { UpdateOurPlanDto } from './dto/update-our-plan.dto';
import { OurPlan, OurPlanDocument } from './entities/our-plan.entity';
import { UpdateOurPlanPackageDto } from './dto/update-our-plan-package.dto';

@Injectable()
export class OurPlanService {
  constructor(
    @InjectModel(OurPlan.name) private planModel: Model<OurPlanDocument>,
  ) {}

  async create(createDto: CreateOurPlanDto) {
    const newPlan = await this.planModel.create(createDto);
    await newPlan.save();
    return newPlan;
  }
  async createPackage(
    file: Express.Multer.File,
    createDto: CreateOurPlanPackageDto,
  ) {
    const plan = await this.planModel.findOne({ _id: createDto.plan_id });
    if (!plan) throw new BadRequestException('Invalid plan id');
    await this.planModel.updateOne(
      { _id: plan._id },
      {
        $addToSet: {
          packages: {
            name: createDto.name,
            icon: file.filename,
          },
        },
      },
    );
    return plan;
  }

  public async updatePackage(
    file: Express.Multer.File,
    dto: UpdateOurPlanPackageDto,
  ) {
    const plan = await this.planModel.findOne({
      'packages._id': dto.plan_id,
    });
    if (!plan) throw new BadRequestException('Invalid package id');
    const updated = {};
    if (dto.name) updated['packages.$.name'] = dto.name;
    if (file) updated['packages.$.icon'] = file.filename;
    await this.planModel.updateOne(
      { 'packages._id': dto.plan_id },
      { $set: updated },
    );
    return plan;
  }

  async createPackageService(createDto: CreateOurPlanPackageServiceDto) {
    const plan = await this.planModel.findOne({
      'packages._id': createDto.package_id,
    });
    if (!plan) throw new BadRequestException('Invalid package id');
    await this.planModel.updateOne(
      { 'packages._id': createDto.package_id },
      {
        $addToSet: {
          'packages.$.package_services': {
            name: createDto.name,
            currency: createDto.currency,
            price: createDto.price,
          },
        },
      },
    );
    return plan;
  }

  async findAllByAdmin() {
    const plan = await this.planModel.findOne({});
    return plan;
  }

  async findAllByPublic() {
    const plan = await this.planModel.findOne({});
    return plan;
  }

  async findOneByPublic(id: string) {
    const plan = await this.planModel.findOne({ _id: id });
    if (!plan) throw new BadRequestException('Invalid plan id');
    return plan;
  }

  async findOneByAdmin(id: string) {
    const plan = await this.planModel.findOne({ _id: id });
    if (!plan) throw new BadRequestException('Invalid plan id');
    return plan;
  }
}

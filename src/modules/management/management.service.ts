import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateManagementServiceDto } from './dto/create-management-service.dto';
import { CreateManagementDto } from './dto/create-management.dto';
import { UpdateManagementDto } from './dto/update-management.dto';
import { Management, ManagementDocument } from './entities/management.entity';

@Injectable()
export class ManagementService {
  constructor(
    @InjectModel(Management.name)
    private managementModel: Model<ManagementDocument>,
  ) {}

  public async create(
    files: {
      thumbnail?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
    createDto: CreateManagementDto,
  ) {
    const newService = await this.managementModel.create({
      ...createDto,
      thumbnail: files.thumbnail[0].filename,
      image: files.image[0].filename,
    });
    await newService.save();
    return newService;
  }

  public async createManagementService(
    file: Express.Multer.File,
    body: CreateManagementServiceDto,
  ) {
    const exists = await this.managementModel
      .findOne({
        _id: body.managementId,
      })
      .select('_id');
    if (!exists) throw new BadRequestException('Invalid management id.');
    await this.managementModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          services: {
            logo: file.filename,
            content: body.content,
            title: body.title,
          },
        },
      },
    );
    return exists;
  }

  async findAllByPublic(q: Pagination) {
    const services = await this.managementModel
      .find({})
      .sort({
        created_at: 1,
      })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'image',
        'services.logo',
        'services.title',
        'services.content',
      ]);
    return services;
  }

  async findAllByAdmin(q: Pagination) {
    const services = await this.managementModel.find({}).sort({
      created_at: -1,
    });
    return services;
  }

  async findOneByAdmin(id: string) {
    const services = await this.managementModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'image',
        'services.logo',
        'services.title',
        'services.content',
      ]);
    if (!services) throw new BadRequestException('Invalid management id.');
    return services;
  }

  async findOneByPublic(id: string) {
    const services = await this.managementModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'image',
        'services.logo',
        'services.title',
        'services.content',
      ]);
    if (!services) throw new BadRequestException('Invalid management id.');
    return services;
  }

  async updateByAdmin(
    id: string,
    files: {
      thumbnail?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
    updateDto: UpdateManagementDto,
  ): Promise<ManagementDocument> {
    const exists = await this.managementModel
      .findOne({
        _id: id,
      })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'image',
        'services.logo',
        'services.title',
        'services.content',
      ]);
    if (!exists) throw new BadRequestException('Invalid management id.');

    Object.keys(updateDto).forEach((key) => {
      exists[key] = updateDto[key];
    });
    if (files?.thumbnail) exists.thumbnail = files.thumbnail[0].filename;
    if (files?.image) exists.image = files.image[0].filename;
    await exists.save();
    return exists;
  }

  async remove(id: string) {
    const exists = await this.managementModel
      .findOne({
        _id: id,
      })
      .select(['_id', 'title']);
    if (!exists)
      throw new BadRequestException(
        'Invalid management id or document maybe deleted.',
      );
    await exists.remove();
    return exists;
  }
}

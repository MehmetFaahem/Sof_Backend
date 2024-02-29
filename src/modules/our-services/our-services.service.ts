import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateOurServiceDto } from './dto/create-our-service.dto';
import { CreateOurServiceProjectDescriptionDto } from './dto/create-our-services-project-description.dto';
import { CreateOurServiceProjectDto } from './dto/create-our-services-project.dto';
import { UpdateOurServiceDto } from './dto/update-our-service.dto';
import { OurServiceDocument, OurServices } from './entities/our-service.entity';

@Injectable()
export class OurServicesService {
  constructor(
    @InjectModel(OurServices.name)
    private ourServicesModel: Model<OurServiceDocument>,
  ) {}

  public async create(createOurServiceDto: CreateOurServiceDto) {
    const newService = await this.ourServicesModel.create(createOurServiceDto);
    await newService.save();
    return newService;
  }

  public async createServiceProject(
    file: Express.Multer.File,
    createDto: CreateOurServiceProjectDto,
  ) {
    const exists = await this.ourServicesModel
      .findOne({
        _id: createDto.our_service_id,
      })
      .select('_id');
    if (!exists) throw new BadRequestException('Invalid service id.');
    await this.ourServicesModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          projects: {
            logo: file.filename,
            content: createDto.content,
            title: createDto.title,
          },
        },
      },
    );
    return exists;
  }

  public async createServiceProjectDescription(
    file: Express.Multer.File,
    createDto: CreateOurServiceProjectDescriptionDto,
  ) {
    const exists = await this.ourServicesModel
      .findOne({
        _id: createDto.our_service_id,
      })
      .select('_id');
    if (!exists) throw new BadRequestException('Invalid service id.');
    await this.ourServicesModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          project_descriptions: {
            thumbnail: file.filename,
            title: createDto.title,
            content: createDto.content,
            project_name: createDto.project_name,
          },
        },
      },
    );
    return exists;
  }

  async findAllByPublic(q: Pagination) {
    const services = await this.ourServicesModel
      .find({})
      .sort({
        created_at: 1,
      })
      .select([
        'title',
        'sub_title',
        'content',
        'projects.logo',
        'projects.title',
        'projects.content',
        'projects.title',
        'projects.content',
        'projects.project_name',
        'project_descriptions.title',
        'project_descriptions.content',
        'project_descriptions.project_name',
        'project_descriptions.thumbnail',
      ]);
    return services;
  }

  async findAllByAdmin(q: Pagination) {
    const services = await this.ourServicesModel
      .find({})
      .select([
        'title',
        'sub_title',
        'content',
        'projects.logo',
        'projects.title',
        'projects.content',
        'projects.title',
        'projects.content',
        'projects.project_name',
        'project_descriptions.title',
        'project_descriptions.content',
        'project_descriptions.project_name',
        'project_descriptions.thumbnail',
      ]);
    return services;
  }

  async findOneByAdmin(id: string) {
    const services = await this.ourServicesModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'projects.logo',
        'projects.title',
        'projects.content',
        'project_descriptions.thumbnail',
        'projects.title',
        'projects.content',
        'projects.project_name',
      ]);
    if (!services) throw new BadRequestException('Invalid service id');
    return services;
  }

  async findOneByPublic(id: string) {
    const services = await this.ourServicesModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'projects.logo',
        'projects.title',
        'projects.content',
        'project_descriptions.thumbnail',
        'projects.title',
        'projects.content',
        'projects.project_name',
      ]);
    if (!services) throw new BadRequestException('Invalid service id');
    return services;
  }

  async update(
    id: string,
    updatedDto: UpdateOurServiceDto,
  ): Promise<OurServiceDocument> {
    const services = await this.ourServicesModel
      .findOne({ _id: id })
      .select(['title', 'sub_title', 'content', '_id']);
    if (!services) throw new BadRequestException('Invalid service id');
    Object.keys(updatedDto).forEach((key) => {
      services[key] = updatedDto[key];
    });
    await services.save();
    return services;
  }

  async remove(id: string) {
    const services = await this.ourServicesModel
      .findOne({ _id: id })
      .select(['title', '_id']);
    if (!services) throw new BadRequestException('Invalid service id');
    await services.remove();
    return services;
  }
}

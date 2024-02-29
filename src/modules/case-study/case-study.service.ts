import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCaseStudyProjectDto } from './dto/create-case-study-project.dto';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { CaseStudy, CaseStudyDocument } from './entities/case-study.entity';

@Injectable()
export class CaseStudyService {
  constructor(
    @InjectModel(CaseStudy.name)
    private caseStudyModel: Model<CaseStudyDocument>,
  ) {}

  public async create(createDto: CreateCaseStudyDto) {
    const newCaseStudy = await this.caseStudyModel.create(createDto);
    await newCaseStudy.save();
    return newCaseStudy;
  }
  public async createProject(
    file: Express.Multer.File,
    createDto: CreateCaseStudyProjectDto,
  ) {
    const exists = await this.caseStudyModel
      .findOne({
        _id: createDto.case_study_id,
      })
      .select(['_id']);
    if (!exists) throw new BadRequestException('Invalid case study id');
    await this.caseStudyModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          projects: {
            ...createDto,
            thumbnail: file.filename,
          },
        },
      },
    );
    return exists;
  }

  public async findAllByPublic() {
    const studies = await this.caseStudyModel
      .findOne({})
      .sort({ _id: -1 })
      .select([
        'title',
        'sub_title',
        'content',
        'projects.sub_title',
        'projects.title',
        'projects.thumbnail',
        'projects.category',
        'projects.content',
        '-_id',
      ]);

    return studies;
  }
  public async findAllByAdmin() {
    const studies = await this.caseStudyModel
      .find({})
      .select([
        'title',
        'sub_title',
        'content',
        'projects.sub_title',
        'projects.title',
        'projects.thumbnail',
        'projects.category',
        'projects.content',
      ]);
    return studies;
  }

  async findOne(id: string) {
    const studies = await this.caseStudyModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'projects.sub_title',
        'projects.title',
        'projects.thumbnail',
        'projects.category',
        'projects.content',
      ]);
    if (!studies) throw new BadRequestException('Invalid case study id.');
    return studies;
  }

  async updateByAdmin(id: string, updateDto: UpdateCaseStudyDto) {
    const studies = await this.caseStudyModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'category',
        '-_id',
      ]);
    if (!studies) throw new BadRequestException('Invalid case study id.');
    Object.keys(updateDto).forEach((key) => {
      studies[key] = updateDto[key];
    });
    await studies.save();
    return studies;
  }

  async remove(id: string) {
    const studies = await this.caseStudyModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'thumbnail',
        'category',
        '-_id',
      ]);
    if (!studies) throw new BadRequestException('Invalid case study id.');
    await studies.remove();
    return studies;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateOurTeamMemberDto } from './dto/create-our-team-member.dto';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamMemberDto } from './dto/update-our-team-member.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';
import { OurTeamDocument, OurTeam } from './entities/our-team.entity';

@Injectable()
export class OurTeamService {
  constructor(
    @InjectModel(OurTeam.name) private ourTeamModel: Model<OurTeamDocument>,
  ) {}

  public async create(creteDto: CreateOurTeamDto) {
    const newService = await this.ourTeamModel.create(creteDto);
    await newService.save();
    return newService;
  }

  public async createTeamMember(
    file: Express.Multer.File,
    createDto: CreateOurTeamMemberDto,
  ) {
    const exists = await this.ourTeamModel
      .findOne({
        _id: createDto.our_member_id,
      })
      .select('_id');
    if (!exists) throw new BadRequestException('Invalid member id.');
    await this.ourTeamModel.updateOne(
      { _id: exists._id },
      {
        $addToSet: {
          members: {
            full_name: createDto.full_name,
            designation: createDto.designation,
            image: file.filename,
            social_links: {
              facebook_link: createDto.social_links.facebook_link,
              twitter_link: createDto.social_links.twitter_link,
              linkedin_link: createDto.social_links.linkedin_link,
            },
          },
        },
      },
    );
    return exists;
  }

  public async updateTeamMember(
    file: Express.Multer.File,
    updateDto: UpdateOurTeamMemberDto,
  ) {
    const exists = await this.ourTeamModel
      .findOne({
        'members._id': updateDto.our_member_id,
      })
      .select(['members._id', '-_id']);
    if (!exists) throw new BadRequestException('Invalid service id.');
    const updateValue = {};
    if (updateDto.full_name)
      updateValue['members.$.full_name'] = updateDto.full_name;
    if (updateDto.designation)
      updateValue['members.$.designation'] = updateDto.designation;
    if (file) updateValue['members.$.image'] = file.filename;

    if (updateDto.social_links)
      Object.keys(updateDto.social_links).forEach((key) => {
        updateValue[`members.$.social_links.${key}`] =
          updateDto.social_links[key];
      });
    await this.ourTeamModel.updateOne(
      {
        'members._id': updateDto.our_member_id,
      },
      {
        $set: updateValue,
      },
    );
    return exists;
  }

  public async deleteTeamMember(id: string) {
    await this.ourTeamModel.updateOne(
      { 'members._id': id },
      { $pull: { members: { _id: id } } },
    );
    return {};
  }

  async findAllByPublic(q: Pagination) {
    const services = await this.ourTeamModel
      .find({})
      .sort({
        created_at: 1,
      })
      .select([
        'title',
        'sub_title',
        'content',
        'members.full_name',
        'members.designation',
        'members.image',
        'members.social_links',
        '-_id',
      ]);
    return services;
  }

  async findAllByAdmin(q: Pagination) {
    const services = await this.ourTeamModel
      .find({})
      .select([
        'title',
        'sub_title',
        'content',
        'members._id',
        'members.full_name',
        'members.designation',
        'members.image',
        'members.social_links',
      ]);
    return services;
  }

  async findOneByAdmin(id: string) {
    const services = await this.ourTeamModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'members.full_name',
        'members.designation',
        'members.image',
        'members.social_links',
      ]);
    if (!services) throw new BadRequestException('Invalid service id');
    return services;
  }

  async findOneByPublic(id: string) {
    const services = await this.ourTeamModel
      .findOne({ _id: id })
      .select([
        'title',
        'sub_title',
        'content',
        'members.full_name',
        'members.designation',
        'members.image',
        'members.social_links',
        '-_id',
      ]);
    if (!services) throw new BadRequestException('Invalid service id');
    return services;
  }

  async update(
    id: string,
    updatedDto: UpdateOurTeamDto,
  ): Promise<OurTeamDocument> {
    const services = await this.ourTeamModel
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
    const services = await this.ourTeamModel
      .findOne({ _id: id })
      .select(['_id']);
    if (!services) throw new BadRequestException('Invalid service id');
    await services.remove();
    return services;
  }
}

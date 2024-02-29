import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/pagination';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { ContactUs, ContactUsDocument } from './entities/contact-us.entity';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name) private contModel: Model<ContactUsDocument>,
  ) {}

  public async create(
    file: Express.Multer.File,
    createDto: CreateContactUsDto,
  ) {
    const contact = await this.contModel.create({
      ...createDto,
      attached_file: file?.filename,
    });
    await contact.save();
    return contact;
  }

  async findAll(q: Pagination) {
    const data = await this.contModel.find({}).limit(100);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactUs`;
  }

  update(id: number, updateContactUsDto: UpdateContactUsDto) {
    return `This action updates a #${id} contactUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactUs`;
  }
}

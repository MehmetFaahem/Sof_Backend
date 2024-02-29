import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactUsService } from './contact-us.service';
import { AdminContactUsController } from './controllers/admin-contact-us.controller';
import { PublicContactUsController } from './controllers/public-contact-us.controller';
import { ContactUs, ContactUsSchema } from './entities/contact-us.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactUs.name, schema: ContactUsSchema },
    ]),
  ],
  controllers: [PublicContactUsController, AdminContactUsController],
  providers: [ContactUsService],
  exports: [ContactUsService],
})
export class ContactUsModule {}

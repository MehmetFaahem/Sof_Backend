import { Module } from '@nestjs/common';
import { OurServicesService } from './our-services.service';
import { AdminOurServicesController } from './controllers/admin-our-services.controller';
import { PublicOurServicesController } from './controllers/public-our-services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OurServices, OurServiceSchema } from './entities/our-service.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OurServices.name, schema: OurServiceSchema },
    ]),
  ],
  controllers: [AdminOurServicesController, PublicOurServicesController],
  providers: [OurServicesService],
})
export class OurServicesModule {}

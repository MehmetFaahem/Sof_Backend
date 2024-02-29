import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrustedCompany,
  TrustedCompanySchema,
} from './entities/partner.entity';
import { AdminPartnersController } from './controllers/admin-partners.controller';
import { PublicPartnersController } from './controllers/public-partners.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrustedCompany.name, schema: TrustedCompanySchema },
    ]),
  ],
  controllers: [PublicPartnersController, AdminPartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}

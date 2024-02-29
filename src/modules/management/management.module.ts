import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { AdminManagementController } from './controllers/admin-management.controller';
import { PublicManagementController } from './controllers/public-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Management, ManagementSchema } from './entities/management.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Management.name, schema: ManagementSchema },
    ]),
  ],
  controllers: [AdminManagementController, PublicManagementController],
  providers: [ManagementService],
  exports: [ManagementService],
})
export class ManagementModule {}

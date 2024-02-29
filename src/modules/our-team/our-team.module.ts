import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminOurTeamController } from './controllers/admin-our-team.controller';
import { PublicOurTeamController } from './controllers/public-our-team.controller';
import { OurTeam, OurTeamSchema } from './entities/our-team.entity';
import { OurTeamService } from './our-team.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OurTeam.name, schema: OurTeamSchema }]),
  ],
  controllers: [AdminOurTeamController, PublicOurTeamController],
  providers: [OurTeamService],
  exports: [OurTeamService],
})
export class OurTeamModule {}

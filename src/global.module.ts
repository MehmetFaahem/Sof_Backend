import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';

@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class GlobalModule {}

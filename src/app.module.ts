import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OurServicesModule } from 'src/modules/our-services/our-services.module';
import { OurPlanModule } from 'src/modules/our-plan/our-plan.module';
import { GlobalModule } from './global.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import {
  ErrorLoggerInterceptor,
  RequestLoggerInterceptor,
  ResponseTransformInterceptor,
} from './common/interceptors';
import { AllExceptionFilter } from './common/filters';
import { PartnersModule } from './modules/partners/partners.module';
import { CaseStudyModule } from './modules/case-study/case-study.module';
import { MulterModule } from '@nestjs/platform-express';
import { ManagementModule } from './modules/management/management.module';
import { AboutUsModule } from './modules/about-us/about-us.module';
import { OurTeamModule } from './modules/our-team/our-team.module';
import { TestimonialModule } from './modules/testimonial/testimonial.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { HeroSectionModule } from './modules/hero-section/hero-section.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import { JobOpeningModule } from './modules/job-opening/job-opening.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    GlobalModule,
    OurServicesModule,
    OurPlanModule,
    PartnersModule,
    CaseStudyModule,
    ManagementModule,
    AboutUsModule,
    OurTeamModule,
    TestimonialModule,
    ContactUsModule,
    HeroSectionModule,
    BenefitModule,
    JobOpeningModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}

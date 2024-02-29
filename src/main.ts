import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = configuration.call(this);
  const appVersion = '/api/v1';

  const builder = new DocumentBuilder()
    .setTitle('Softex Web REST API')
    .setDescription('Softex Web REST API')
    .setVersion('1.0')
    .addServer(appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup(appVersion + '/docs', app, document);

  // server uploads folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Enabling cross-origin resource sharing that is another domain can request resources
  app.enableCors({
    origin: '*', // This might need to be changed into some specific values, rather than all
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // Pipeline for validation of all inputs.
  // It will be transformed, and if implicit transformation can be done transform immediately.
  // The input data, which do not contain any validation decorator, of a validated object.
  // Exceptions are handled using exceptionFactory parameter
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        if (validationErrors[0].children.length)
          return new BadRequestException(
            Object.values(validationErrors[0].children[0].constraints)[0],
          );
        else
          return new BadRequestException(
            Object.values(validationErrors[0].constraints)[0],
          );
      },
    }),
  );
  // set application global prefix. This allow /api/v1 in front every endpoint
  app.setGlobalPrefix(appVersion);

  // set application port and lister and server application to given port
  const port = config.port || 3000;
  await app.listen(port);
  Logger.log(port, 'AppsRunningPort');
}
bootstrap();

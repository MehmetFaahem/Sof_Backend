import databaseConfig from './database.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

console.log('databaseConfig', databaseConfig);

export default () => ({
  port: parseInt(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
  database: databaseConfig,
});

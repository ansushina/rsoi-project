import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const path = require('path');

require('dotenv').config({
  path: path.resolve(
      process.cwd(),
      '.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(process.env.PORT);
}
bootstrap();

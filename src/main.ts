import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'https://crisjs.vercel.app',
      'https://criscrm.vercel.app',
      'https://terrakota.vercel.app',
      'https://regalosterrakota.vercel.app',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
}
bootstrap();

import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import express from 'express';
import { FILE_UPLOADS_PUBLIC_PATH } from './config/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  /**
   * Configure endpoint API. Ex: http://localhost:3001/api
   */
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Configure docs Swagger. Ex: http://localhost:3001/docs
   */
  const config = new DocumentBuilder()
    .setTitle('Demon example')
    .setDescription('Demon Mock API')
    .setVersion('1.0')
    .addTag('demon')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  /**
   * For public assets. Ex: http://localhost:3001/static
   * Access: protocol://ip:port/static/[path-asset-returned]. Ex: http://localhost:3001/static/assets/abc.jpg
   */
  const public_folder = FILE_UPLOADS_PUBLIC_PATH;
  console.log('public_folder', public_folder);
  app.use('/static', express.static(public_folder));
  // app.use(
  //   '/static',
  //   express.static(join(__dirname, '..', '../uploads/public')),
  // );

  /**
   * Port
   */
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}/api`);
}
bootstrap();

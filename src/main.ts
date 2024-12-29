import 'dotenv/config'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'error', 'fatal', 'log', 'verbose', 'warn'] });

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: '*'
  })

  const config = new DocumentBuilder()
    .setTitle('Fincheck')
    .setDescription('The API from Fincheck project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: 2
    }
  })

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

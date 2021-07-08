import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Nestjs auth')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const logger = app.get('NestWinston');
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';
import { InvalidRelationExceptionFilter } from './exception-filters/invalid-relation.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new InvalidRelationExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  const docsConfig = new DocumentBuilder()
    .setTitle('Videos REST API - Nest.js + MySQL + Prisma')
    .setDescription(
      'Aplicação REST para gestão de Vídeos e Categorias, construída com Nest.js 10, MySQL e Prisma ORM, para o Esquenta da Imersão Full Stack && Full Cycle #16',
    )
    .setVersion('0.0.0')
    .build();
  const docs = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('api/docs', app, docs);

  await app.listen(3000);
}
bootstrap();

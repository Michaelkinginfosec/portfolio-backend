import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)

  app.setGlobalPrefix('api/v1');


const config = new DocumentBuilder()
  .setTitle('MICHAELKING')
  .setDescription('This API powers my personal portfolio website. You can view the projects I have worked on, along with links to the live versions of these projects.')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    },
    'access-token', 
  )
  .build();

const document = SwaggerModule.createDocument(app, config);


SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

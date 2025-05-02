import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors();


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  
  const config = new DocumentBuilder()
    .setTitle('OLX.uz Backend API')
    .setDescription('Karoche bu proyekt jaydaricha OLX.uz ga o`xshab qoldi')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('olx', app, document); 

  
  const port = process.env.PORT ?? 7000;
  await app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
bootstrap();

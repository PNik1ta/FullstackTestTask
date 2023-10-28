import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ElasticsearchLoggerService } from './elastic-search-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(ElasticsearchLoggerService);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://www.localhost:3000',
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Test task')
    .setDescription('Test task API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use((req: Request, res: Response, next) => {
    express.json()(req, res, () => {
      if (req.url !== '/metrics') {
        loggerService.logHTTPRequest(req.method, req.url, JSON.stringify(req.body), res.statusCode);
      }
      next();
    })
  });

  await app.listen(5000);
}
bootstrap();

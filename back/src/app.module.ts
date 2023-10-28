import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { ElasticsearchLoggerService } from './elastic-search-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrometheusModule.register(),
    LoggerModule.forRoot({
      pinoHttp: {
        timestamp: stdTimeFunctions.isoTime,
        level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info'
      }
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule
  ],
  controllers: [],
  providers: [
    ElasticsearchLoggerService,
    {
      provide: ElasticsearchLoggerService,
      useClass: ElasticsearchLoggerService
    },
  ],
  exports: [ElasticsearchLoggerService]
})
export class AppModule { }

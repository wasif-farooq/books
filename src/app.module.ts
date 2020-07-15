import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from "./book/book.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './analytics/analytics.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    AnalyticsModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

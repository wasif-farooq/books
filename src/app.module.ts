import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from "./book/book.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './analytics/analytics.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/affiliate'),
    AuthModule,
    AnalyticsModule,
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

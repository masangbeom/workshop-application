import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./rds.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: Boolean(process.env.RDS_CONNECTION) ? [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfigService],
      useFactory: async (typeOrmConfigService: TypeOrmConfigService) => typeOrmConfigService.createTypeOrmOptions()
    })
  ] : [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

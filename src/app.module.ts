import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./typeorm.service";
import {RdsModule} from './rds/rds.module';
import {ConfigModule} from "@nestjs/config";

// If you have set RDS, change it to "true"
const rdsConnection = true;

@Module({
    imports: rdsConnection ? [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        RdsModule,
    ] : [
        ConfigModule.forRoot({isGlobal: true})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

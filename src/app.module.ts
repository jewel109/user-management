import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessInterceptor } from './success.interceptor';
import { type } from 'os';
import { async } from 'rxjs';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true
  }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: 'localhost',
        port: configService.get('DB_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: SuccessInterceptor }],
})
export class AppModule { }

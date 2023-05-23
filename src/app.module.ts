import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path'
import { ArticleModule } from './domain/article/article.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './domain/comment/comment.module';

console.log(`.env.${process.env.NODE_ENV}`);

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      retryAttempts: configService.get('NODE_ENV') === 'prod' ? 10 : 1,
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      database: configService.get('DB_NAME'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      entities: [path.join(__dirname, 'entities/**/*.entity.{js, ts}')],
      synchronize: false,
      logging: true,
      timezone: 'local',
    })
  }),
  UserModule, ArticleModule, AuthModule, CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ce54rb14nc01986$',
      database: 'db_patterns',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

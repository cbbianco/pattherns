import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntiPatternsModule } from './anti-pattherns/anti-patterns.module';

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
    AntiPatternsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

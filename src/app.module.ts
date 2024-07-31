import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MinioModule,
  ],
})
export class AppModule {}

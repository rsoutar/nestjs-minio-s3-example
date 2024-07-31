import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio.service';
import { FileController } from './minio.controller';

@Module({
  imports: [ConfigModule],
  providers: [MinioService],
  controllers: [FileController],
  exports: [MinioService],
})
export class MinioModule {}

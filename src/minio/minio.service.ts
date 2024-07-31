import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioService {
  private minioClient: Client;
  private readonly logger = new Logger(MinioService.name);

  constructor(private configService: ConfigService) {
    const endPoint = this.configService.get<string>('MINIO_ENDPOINT');
    const port = parseInt(this.configService.get('MINIO_PORT'), 10);
    const useSSL = this.configService.get<string>('MINIO_USE_SSL') === 'true';
    const accessKey = this.configService.get<string>('MINIO_ACCESS_KEY');
    const secretKey = this.configService.get<string>('MINIO_SECRET_KEY');

    this.logger.debug(`MINIO_ENDPOINT: ${endPoint}`);
    this.logger.debug(`MINIO_PORT: ${port}`);
    this.logger.debug(`MINIO_USE_SSL: ${useSSL}`);
    this.logger.debug(`MINIO_ACCESS_KEY: ${accessKey ? 'set' : 'not set'}`);
    this.logger.debug(`MINIO_SECRET_KEY: ${secretKey ? 'set' : 'not set'}`);

    if (
      !endPoint ||
      isNaN(port) ||
      useSSL === undefined ||
      !accessKey ||
      !secretKey
    ) {
      throw new Error(
        'MinIO configuration is incomplete. Check your environment variables.',
      );
    }

    this.minioClient = new Client({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey,
    });
  }

  async uploadFile(
    bucketName: string,
    objectName: string,
    stream: any,
  ): Promise<string> {
    await this.minioClient.putObject(bucketName, objectName, stream);
    return `https://${this.configService.get('MINIO_ENDPOINT')}/${bucketName}/${objectName}`;
  }

  async getFileStream(bucketName: string, objectName: string) {
    return this.minioClient.getObject(bucketName, objectName);
  }

  async listObjects(bucketName: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const objects: string[] = [];
      const stream = this.minioClient.listObjects(bucketName, '', true);

      stream.on('data', (obj) => {
        objects.push(obj.name);
      });

      stream.on('error', (err) => {
        this.logger.error(`Error listing objects: ${err}`);
        reject(err);
      });

      stream.on('end', () => {
        resolve(objects);
      });
    });
  }
}
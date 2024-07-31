import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MinioService } from './minio.service';

@Controller('files')
export class FileController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const objectName = `${Date.now()}-${file.originalname}`;
    const fileBuffer = file.buffer;

    const url = await this.minioService.uploadFile(objectName, fileBuffer);
    return { url };
  }

  @Get('list')
  async listFiles(@Res() res: Response) {
    try {
      const objects = await this.minioService.listObjects();
      res.json(objects);
    } catch (err) {
      console.error('Error listing objects:', err);
      res.status(500).send('An error occurred while listing objects');
    }
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const fileStream = await this.minioService.getFileStream(filename);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      fileStream.pipe(res);
    } catch (err) {
      console.error('Error retrieving file:', err);
      if (err.code === 'NoSuchKey') {
        res.status(404).send('File not found');
      } else {
        res.status(500).send('An error occurred while retrieving the file');
      }
    }
  }
}

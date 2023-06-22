import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { storagePrivate, storagePublic } from '../config/storage.config';

@Controller('uploads')
export class UploadsController {
  private readonly logger = new Logger(UploadsController.name);
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('private')
  @UseInterceptors(FileInterceptor('file', { storage: storagePrivate }))
  uploadFilePrivate(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.'); // Use `throw` to handle exceptions
    }
    this.logger.log('file private', file);
    const dataRes = this.uploadsService.getFilePath(file);
    return dataRes;
  }

  @Post('public')
  @UseInterceptors(FileInterceptor('file', { storage: storagePublic }))
  uploadFilePublic(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.'); // Use `throw` to handle exceptions
    }
    this.logger.log('file public', file);
    const dataRes = this.uploadsService.getFilePath(file, 'public');
    return dataRes;
  }
}

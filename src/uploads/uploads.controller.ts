import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Logger,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { storagePrivate, storagePublic } from '../config/storage.config';
import { FILE_UPLOADS_MAX_NUMBER } from 'src/config/config';

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

  @Post('privates')
  @UseInterceptors(
    FilesInterceptor('files', FILE_UPLOADS_MAX_NUMBER, {
      storage: storagePrivate,
    }),
  )
  uploadFilesPrivate(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }
    this.logger.log('files private', files);
    const dataRes = this.uploadsService.getFilesPath(files);
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

  @Post('publics')
  @UseInterceptors(
    FilesInterceptor('files', FILE_UPLOADS_MAX_NUMBER, {
      storage: storagePublic,
    }),
  )
  uploadFilesPublic(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded.'); // Use `throw` to handle exceptions
    }
    this.logger.log('files public', files);
    const dataRes = this.uploadsService.getFilesPath(files, 'public');
    return dataRes;
  }
}

import {
  Controller,
  Get,
  Param,
  Res,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { DownloadsService } from './downloads.service';
import { FILE_UPLOADS_PRIVATE_PATH } from 'src/config/config';
import { checkFileExists } from 'src/utils/file_utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('downloads')
@ApiTags('downloads')
export class DownloadsController {
  private readonly logger = new Logger(DownloadsController.name);
  constructor(private readonly downloadsService: DownloadsService) {}

  @Get('stream/:filename')
  stream(@Param('filename') filename: string, @Res() res: Response) {
    this.logger.log('stream filename', filename);
    try {
      const filePath = `${FILE_UPLOADS_PRIVATE_PATH}${filename}`;
      if (!checkFileExists(filePath)) {
        this.logger.error(`File ${filePath} not found`);
        res.status(404).send('File not found');
        return;
      }

      const file = this.downloadsService.fileStream(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      file.pipe(res);
    } catch (error) {
      this.logger.error('Error downloading file:', error);
      res.status(500).send('Error downloading file');
    }
  }

  @Get('buffer/:filename')
  buffer(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.logger.log('buffer filename', filename);
    try {
      const filePath = `${FILE_UPLOADS_PRIVATE_PATH}${filename}`;
      if (!checkFileExists(filePath)) {
        this.logger.error(`File ${filePath} not found`);
        res.status(404).send('File not found');
        return;
      }

      const file = this.downloadsService.fileBuffer(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      return new StreamableFile(file);
    } catch (error) {
      this.logger.error('Error downloading file:', error);
      res.status(500).send('Error downloading file');
    }
  }
}

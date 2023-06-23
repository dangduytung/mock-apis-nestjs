import { Injectable, Logger } from '@nestjs/common';
import * as config from 'src/config/config';

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  /**
   * Returns the path of a file after uploaded.
   * @param {Express.Multer.File} file - The file
   * @param {string} [accessType='private'] - The access type: 'private' or 'public'.
   * @returns {object} The file path.
   */
  getFilePath(file: Express.Multer.File, accessType = 'private'): any {
    const folder =
      accessType == 'public' ? config.FOLDER_PUBLIC : config.FOLDER_PRIVATE;
    this.logger.log({ accessType, folder });

    const res = { path: '/' + folder + '/' + file?.filename };
    return res;
  }

  /**
   * Returns the array paths of multiple files after uploaded.
   * @param {Array<Express.Multer.File>} files - The multiple files
   * @param {string} [accessType='private'] - The access type: 'private' or 'public'.
   * @returns {Array<object>} The array of files path.
   */
  getFilesPath(files: Array<Express.Multer.File>, accessType = 'private'): any {
    const folder =
      accessType == 'public' ? config.FOLDER_PUBLIC : config.FOLDER_PRIVATE;
    this.logger.log('getFilesPath', { accessType, folder });
    const res = [];
    files.forEach((file) => {
      res.push({ path: '/' + folder + '/' + file?.filename });
    });
    return res;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import path from 'path';
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

  // uploadFiles(files: Array<Express.Multer.File>, folder: string): any {
  //   const res: Array<any> = [];
  //   if (!folder) {
  //     folder = FOLDER_PRIVATE;
  //   }
  //   files.forEach((file) => {
  //     res.push({ path: '/' + folder + '/' + file?.filename });
  //   });
  //   return res;
  // }
}

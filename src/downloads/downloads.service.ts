import { Injectable } from '@nestjs/common';
import { createReadStream, readFileSync } from 'fs';

@Injectable()
export class DownloadsService {
  fileBuffer(filePath: string) {
    return readFileSync(filePath);
  }

  fileStream(filePath: string) {
    return createReadStream(filePath);
  }
}

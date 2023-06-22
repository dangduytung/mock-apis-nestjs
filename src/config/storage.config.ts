import { diskStorage } from 'multer';
import { PATH_PUBLIC_FOLDER, PATH_PRIVATE_FOLDER } from './config';

export const storagePublic = diskStorage({
  destination: PATH_PUBLIC_FOLDER,
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const storagePrivate = diskStorage({
  destination: PATH_PRIVATE_FOLDER,
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file: Express.Multer.File) {
  return `${Date.now()}.${file.originalname}`;
}

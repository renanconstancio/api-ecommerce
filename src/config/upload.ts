import path, { extname } from 'path';
import multer, { StorageEngine } from 'multer';
import { randomUUID as uuid } from 'crypto';
import AppError from '@shared/errors/AppError';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(request, file, callback) {
        const filename = `${uuid()}${extname(file.originalname)}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'api-vendas',
    },
  },
} as IUploadConfig;

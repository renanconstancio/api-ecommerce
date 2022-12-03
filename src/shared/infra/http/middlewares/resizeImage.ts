import fs from 'fs';
import sharp from 'sharp';
import { NextFunction, Request, Response } from 'express';
import resizeImage from '@config/resizeImage';
import { randomUUID as uuid } from 'crypto';

export default async function resizeImages(
  req: Request,
  _resp: Response,
  next: NextFunction,
): Promise<void> {
  if (!req.files) return next();

  if (!fs.existsSync(resizeImage.pathResolve)) {
    fs.mkdirSync(resizeImage.pathResolve, 664);
  }

  if (!fs.existsSync(resizeImage.pathResolveMd)) {
    fs.mkdirSync(resizeImage.pathResolveMd, 664);
  }

  if (!fs.existsSync(resizeImage.pathResolveXs)) {
    fs.mkdirSync(resizeImage.pathResolveXs, 664);
  }

  req.body.photos = [];
  const files = req.files as Express.Multer.File[];
  await Promise.all(
    files.map(async (file: Express.Multer.File) => {
      const filename = `${uuid()}.jpg`;

      await sharp(file.buffer)
        .resize(1200, 1200, resizeImage.config)
        // .composite([{ input: resizeImage.waterMark }])
        .jpeg({ quality: 98 })
        .toFile(`${resizeImage.pathResolve}/${filename}`);

      await sharp(`${resizeImage.pathResolve}/${filename}`)
        .resize(800, 800, resizeImage.config)
        .jpeg({ quality: 94 })
        .toFile(`${resizeImage.pathResolveMd}/${filename}`);

      await sharp(`${resizeImage.pathResolve}/${filename}`)
        .resize(400, 400, resizeImage.config)
        .jpeg({ quality: 90 })
        .toFile(`${resizeImage.pathResolveXs}/${filename}`);

      req.body.photos.push(`${filename}`);
    }),
  );
  return next();
}

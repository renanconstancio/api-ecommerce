import fs from 'fs';
import sharp from 'sharp';
import { IResizeImage } from './dtos/IResizeImage';
import resizeImage from '@config/resizeImage';

export default class ResizeImage implements IResizeImage {
  async xs(image: string): Promise<string> {
    if (!fs.existsSync(resizeImage.pathResolveXs)) {
      fs.mkdirSync(resizeImage.pathResolveXs);
    }

    await sharp(`${resizeImage.pathResolve}/${image}`)
      .resize(300, 300, resizeImage.config)
      .toFile(`${resizeImage.pathResolveXs}/${image}`);

    return image;
  }

  async md(image: string): Promise<string> {
    if (!fs.existsSync(resizeImage.pathResolveMd)) {
      fs.mkdirSync(resizeImage.pathResolveMd);
    }

    await sharp(`${resizeImage.pathResolve}/${image}`)
      .resize(500, 500, resizeImage.config)
      .toFile(`${resizeImage.pathResolveMd}/${image}`);

    return image;
  }

  async lg(image: string): Promise<string> {
    await sharp(`${resizeImage.pathResolve}/${image}`)
      .resize(1000, 1000, resizeImage.config)
      .toFile(`${resizeImage.pathResolve}/tmp-${image}`);

    fs.renameSync(
      `${resizeImage.pathResolve}/tmp-${image}`,
      `${resizeImage.pathResolve}/${image}`,
    );

    return image;
  }
}

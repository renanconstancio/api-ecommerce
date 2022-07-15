import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

import { IUpdateProductImage } from '../domain/models/IUpdateProductImage';
import { IProductsImagesRepository } from '../domain/repositories/IProductsImagesRepository';
import { ICreateProductImage } from '../domain/models/ICreateProductImage';

@injectable()
export default class UpdateProductsImagesService {
  constructor(
    @inject('ProductsImagesRepository')
    private productsImagesRepository: IProductsImagesRepository,
  ) {}

  async execute({
    id,
    product_sku_id,
    imageFilename,
  }: IUpdateProductImage): Promise<void> {
    const image = await this.productsImagesRepository.findById(id);

    if (!image) {
      throw new AppError('Image not found.');
    }

    // if (uploadConfig.driver === 's3') {
    //   const s3Provider = new S3StorageProvider();
    //   if (image.image) {
    //     await s3Provider.deleteFile(image.image);
    //   }
    //   const filename = await s3Provider.saveFile(imageFilename);
    //   image.image = filename;
    // } else {
    //   const diskProvider = new DiskStorageProvider();
    //   if (image.image) {
    //     await diskProvider.deleteFile(image.image);
    //   }
    //   const filename = await diskProvider.saveFile(imageFilename);
    //   image.image = filename;
    // }

    await this.productsImagesRepository.save({
      product_sku_id,
      image: imageFilename,
      position: 0,
    } as ICreateProductImage);

    return;
  }
}

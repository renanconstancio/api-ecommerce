import { prisma } from '@shared/infra/prisma';
import { IProductsImagesRepository } from '@modules/products/domain/repositories/IProductsImagesRepository';
import { ICreateProductImage } from '@modules/products/domain/dtos/ICreateProductImage';
import { ProductsImagesEntity } from '../entities/ProductsImages';

export default class ProductsImagesRepository
  implements IProductsImagesRepository
{
  async create(data: ICreateProductImage): Promise<ProductsImagesEntity> {
    return await prisma.productsImages.create({
      data: {
        ...data,
      },
    });
  }

  async remove(id: string): Promise<void> {
    // await this.ormRepository.softDelete(id);
  }

  async findBySkuIdCount(product_sku_id: string): Promise<number> {
    return await prisma.productsImages.count({
      where: { product_sku_id },
    });
  }

  async findById(id: string): Promise<ProductsImagesEntity | null> {
    const productImage = await prisma.productsImages.findUnique({
      where: { id },
    });

    return productImage;
  }
}

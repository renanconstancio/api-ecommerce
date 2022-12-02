import { prisma } from '@shared/infra/prisma';
import { IProductsImagesRepository } from '@modules/products/repositories/IProductsImagesRepository';
import { ICreateProductImage } from '@modules/products/dtos/ICreateProductImage';
import { ProductsImages } from '@modules/products/infra/prisma/dtos/productImage';

export default class ProductImageRepository
  implements IProductsImagesRepository
{
  async create(data: ICreateProductImage): Promise<ProductsImages> {
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

  async findById(id: string): Promise<ProductsImages | null> {
    const productImage = await prisma.productsImages.findUnique({
      where: { id },
    });

    return productImage;
  }
}

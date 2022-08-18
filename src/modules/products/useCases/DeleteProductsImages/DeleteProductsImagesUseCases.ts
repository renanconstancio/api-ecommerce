import { inject, injectable } from 'tsyringe';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';
import { IUpdateProductSku } from '@modules/products/dtos/IUpdateProductSku';
import { ProductsSkusEntity } from '@modules/products/infra/prisma/entities/ProductsSkus';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteProductsImagesUseCases {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(data: IUpdateProductSku): Promise<ProductsSkusEntity> {
    const productSku = await this.productsSkusRepository.findById(
      data.product_id,
      data.id,
    );

    if (!productSku) {
      throw new AppError('Product and Product Sku not found.');
    }

    const productExists = await this.productsSkusRepository.findBySku(data.sku);

    if (productExists && data.sku !== productExists.sku) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    return await this.productsSkusRepository.update({ ...data });
  }
}

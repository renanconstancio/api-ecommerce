import { inject, injectable } from 'tsyringe';
import { IProductSkuRepository } from '@modules/products/infra/repositories/IProductSkuRepository';
import { IUpdateProductSku } from '@modules/products/dtos/IUpdateProductSku';
import { ProductsSkusEntity } from '@modules/products/infra/prisma/dtos/productSkuDTOs';
import AppError from '@shared/errors/appError';

@injectable()
export default class UpdateProductsSkusUseCases {
  constructor(
    @inject('ProductSkuRepository')
    private ProductSkuRepository: IProductSkuRepository,
  ) {}

  async execute(data: IUpdateProductSku): Promise<ProductsSkusEntity> {
    const productSku = await this.ProductSkuRepository.findById(
      data.product_id,
      data.id,
    );

    if (!productSku) {
      throw new AppError('Product and Product Sku not found.');
    }

    const productExists = await this.ProductSkuRepository.findBySku(data.sku);

    if (productExists && data.sku !== productExists.sku) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    return await this.ProductSkuRepository.update({ ...data });
  }
}

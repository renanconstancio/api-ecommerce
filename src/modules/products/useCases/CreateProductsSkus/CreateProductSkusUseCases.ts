import { inject, injectable } from 'tsyringe';
import { ICreateProductSku } from '@modules/products/dtos/ICreateProductSku';
import { IProductSkuRepository } from '@modules/products/repositories/IProductSkuRepository';
import { ProductsSkus } from '@modules/products/infra/prisma/dtos/productSku';
import AppError from '@shared/errors/appError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class CreateProductSkusUseCases {
  constructor(
    @inject('ProductSkuRepository')
    private ProductSkuRepository: IProductSkuRepository,
  ) {}

  async execute(data: ICreateProductSku): Promise<ProductsSkus> {
    const productSkuExists = await this.ProductSkuRepository.findBySku(
      data.sku,
    );

    if (productSkuExists) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const productSku = await this.ProductSkuRepository.create({ ...data });

    return productSku;
  }
}

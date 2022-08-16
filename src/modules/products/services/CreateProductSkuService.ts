import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import { ICreateProductSku } from '../domain/models/ICreateProductSku';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import { ProductsSkus } from '@prisma/client';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute(data: ICreateProductSku): Promise<ProductsSkus> {
    const productSkuExists = await this.productsSkusRepository.findBySku(
      data.sku,
    );

    if (productSkuExists) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const productSku = await this.productsSkusRepository.create({ ...data });

    return productSku;
  }
}

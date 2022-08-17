import { inject, injectable } from 'tsyringe';
import { IDeleteProductSku } from '../domain/dtos/IDeleteProductSku';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import AppError from '@shared/errors/AppError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class DeleteProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({ product_id, id }: IDeleteProductSku): Promise<void> {
    const product = await this.productsSkusRepository.findById(product_id, id);

    if (!product) {
      throw new AppError('Product Sku not found.');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productsSkusRepository.remove(id);
  }
}

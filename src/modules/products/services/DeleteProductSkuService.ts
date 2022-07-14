import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import { IDeleteProductSku } from '../domain/models/IDeleteProductSku';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({ id }: IDeleteProductSku): Promise<void> {
    const product = await this.productsSkusRepository.findByIdSku(id);

    if (!product) {
      throw new AppError('Product Sku not found.');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productsSkusRepository.remove(id);
  }
}

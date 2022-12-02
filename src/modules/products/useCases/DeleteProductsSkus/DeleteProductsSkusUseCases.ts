import { inject, injectable } from 'tsyringe';
import { IDeleteProductSku } from '@modules/products/dtos/IDeleteProductSku';
import { IProductSkuRepository } from '@modules/products/repositories/IProductSkuRepository';
import AppError from '@shared/errors/appError';

// import redisCache from '@shared/cache/RedisCache';

@injectable()
export default class DeleteProductsSkusUseCases {
  constructor(
    @inject('ProductSkuRepository')
    private ProductSkuRepository: IProductSkuRepository,
  ) {}

  async execute({ product_id, id }: IDeleteProductSku): Promise<void> {
    const product = await this.ProductSkuRepository.findById(product_id, id);

    if (!product) {
      throw new AppError('Product Sku not found.');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.ProductSkuRepository.remove(id);
  }
}

import { inject, injectable } from 'tsyringe';
// import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '../domain/models/ICreateProductSku';
import { IProductSku } from '../domain/models/IProductSku';

@injectable()
export default class CreateProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({
    product_id,
    sku,
    cost_price,
    sale_price,
    price,
    quantity,
  }: ICreateProductSku): Promise<IProductSku> {
    const productSkuExists = await this.productsSkusRepository.findBySku(sku);

    if (productSkuExists) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    const product = await this.productsSkusRepository.create({
      sku: sku,
      product_id: product_id,
      cost_price: cost_price,
      sale_price: sale_price,
      price: price,
      quantity: quantity,
    });

    return product;
  }
}

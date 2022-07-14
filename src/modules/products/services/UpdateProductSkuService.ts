import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IProductsSkusRepository } from '../domain/repositories/IProductsSkusRepository';
import { IProductSku } from '../domain/models/IProductSku';
import { IUpdateProductSku } from '../domain/models/IUpdateProductSku';

@injectable()
export default class UpdateProductSkuService {
  constructor(
    @inject('ProductsSkusRepository')
    private productsSkusRepository: IProductsSkusRepository,
  ) {}

  async execute({
    id,
    cost_price,
    sale_price,
    price,
    quantity,
    sku,
  }: IUpdateProductSku): Promise<IProductSku> {
    const productSku = await this.productsSkusRepository.findByIdSku(id);

    if (!productSku) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsSkusRepository.findBySku(sku);

    if (productExists && sku !== productSku.sku) {
      throw new AppError('There is already one product sku with this sku');
    }

    // await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    productSku.cost_price = cost_price;
    productSku.sale_price = sale_price;
    productSku.price = price;
    productSku.quantity = quantity;
    productSku.sku = sku;

    await this.productsSkusRepository.save(productSku);

    return productSku;
  }
}

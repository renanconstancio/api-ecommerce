import { inject, injectable } from 'tsyringe';
import { IShowProductSku } from '../../dtos/IShowProductSku';
import { IProductSkuRepository } from '../../repositories/IProductSkuRepository';
import { ProductsEntity } from '../../infra/prisma/dtos/productDTOs';
import AppError from '@shared/errors/appError';

@injectable()
export default class FindProductsSkusUseCases {
  constructor(
    @inject('ProductSkuRepository')
    private ProductSkuRepository: IProductSkuRepository,
  ) {}

  async execute({ product_id, id }: IShowProductSku): Promise<ProductsEntity> {
    const product = await this.ProductSkuRepository.findById(product_id, id);

    if (!product) {
      throw new AppError('Product and Sku not found.');
    }

    return product;
  }
}

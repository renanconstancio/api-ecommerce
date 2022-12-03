import { inject, injectable } from 'tsyringe';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import AppError from '@shared/errors/appError';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';

@injectable()
export default class FindProductSkuUseCase {
  constructor(
    @inject('ProductSkuRepository')
    private repository: IProductSkuRepository,
  ) {}

  async execute(product_id: string, id: string): Promise<ProductDTOs> {
    const idExists = await this.repository.findByIdSku(product_id, id);

    if (!idExists?.id) {
      throw new AppError('sku não encontrado!');
    }

    return idExists;
  }
}

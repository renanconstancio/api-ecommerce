import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';
import AppError from '@shared/errors/appError';

@injectable()
export default class FindProductUseCase {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  async execute(id: string): Promise<ProductDTOs> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError('nada encontrado!');
    }

    return product;
  }
}

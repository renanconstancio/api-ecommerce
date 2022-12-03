import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import AppError from '@shared/errors/appError';

@injectable()
export default class DeleteProductUseCase {
  constructor(
    @inject('ProductRepository')
    private repository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const idExisted = await this.repository.findById(id);

    if (!idExisted?.id) {
      throw new AppError('nada encontrado!');
    }

    await this.repository.delete(id);
  }
}

import { inject, injectable } from 'tsyringe';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import AppError from '@shared/errors/appError';

@injectable()
export default class DeleteProductSkuUseCase {
  constructor(
    @inject('ProductSkuRepository')
    private repository: IProductSkuRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const idExists = await this.repository.findById(id);

    if (!idExists?.id) {
      throw new AppError('sku não encontrado!');
    }

    await this.repository.remove(id);
  }
}

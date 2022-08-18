import { inject, injectable } from 'tsyringe';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import { IDeleteProduct } from '@modules/products/dtos/IDeleteProduct';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute({ id }: IDeleteProduct): Promise<void> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Product not found.');
    }

    await this.storesRepository.remove(id);
  }
}

import { inject, injectable } from 'tsyringe';
import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';
import { IDeleteProduct } from '@modules/products/dtos/IDeleteProduct';
import AppError from '@shared/errors/appError';

@injectable()
export default class DeleteStoresUseCases {
  constructor(
    @inject('StoreRepository')
    private StoreRepository: IStoreRepository,
  ) {}

  async execute({ id }: IDeleteProduct): Promise<void> {
    const store = await this.StoreRepository.findById(id);

    if (!store) {
      throw new AppError('Product not found.');
    }

    await this.StoreRepository.remove(id);
  }
}

import { inject, injectable } from 'tsyringe';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';
import { IShowStore } from '@modules/stores/dtos/IShowStore';

import AppError from '@shared/errors/appError';

@injectable()
export default class FindStoresUseCases {
  constructor(
    @inject('StoreRepository')
    private StoreRepository: IStoreRepository,
  ) {}

  async execute({ id }: IShowStore): Promise<StoresEntity> {
    const store = await this.StoreRepository.findById(id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    return store;
  }
}

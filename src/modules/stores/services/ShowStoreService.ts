import { inject, injectable } from 'tsyringe';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import { IShowStore } from '@modules/stores/domain/dtos/IShowStore';

import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute({ id }: IShowStore): Promise<StoresEntity> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    return store;
  }
}

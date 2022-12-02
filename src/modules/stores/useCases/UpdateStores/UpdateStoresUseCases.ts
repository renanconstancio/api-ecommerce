import { inject, injectable } from 'tsyringe';
import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';
import { IUpdateStore } from '@modules/stores/dtos/IUpdateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import AppError from '@shared/errors/appError';

@injectable()
export default class UpdateStoresUseCases {
  constructor(
    @inject('StoreRepository')
    private StoreRepository: IStoreRepository,
  ) {}

  async execute(data: IUpdateStore): Promise<StoresEntity> {
    const store = await this.StoreRepository.findById(data.id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    const storeExists = await this.StoreRepository.findByFantasyName(
      data.fantasy_name,
    );

    if (storeExists && data.fantasy_name !== store.fantasy_name) {
      throw new AppError(
        'There is already one store with this fantasy fantasy_name',
      );
    }

    return await this.StoreRepository.update(data);
  }
}

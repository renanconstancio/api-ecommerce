import { inject, injectable } from 'tsyringe';
import { IStoresRepository } from '@modules/stores/repositories/IStoresRepository';
import { IUpdateStore } from '@modules/stores/dtos/IUpdateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateStoresUseCases {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute(data: IUpdateStore): Promise<StoresEntity> {
    const store = await this.storesRepository.findById(data.id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    const storeExists = await this.storesRepository.findByFantasyName(
      data.fantasy_name,
    );

    if (storeExists && data.fantasy_name !== store.fantasy_name) {
      throw new AppError(
        'There is already one store with this fantasy fantasy_name',
      );
    }

    return await this.storesRepository.update(data);
  }
}

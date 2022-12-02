import { inject, injectable } from 'tsyringe';
import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';
import { ICreateStore } from '@modules/stores/dtos/ICreateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import AppError from '@shared/errors/appError';

@injectable()
export default class CreateStoresUseCases {
  constructor(
    @inject('StoreRepository')
    private StoreRepository: IStoreRepository,
  ) {}

  async execute(data: ICreateStore): Promise<StoresEntity> {
    const storeExists = await this.StoreRepository.findByFantasyName(
      data.fantasy_name,
    );

    if (storeExists) {
      throw new AppError('There is already one stores with this fantasy name');
    }

    const store = await this.StoreRepository.create({
      ...data,
      visible: data.visible ? 1 : 0,
    });

    return store;
  }
}

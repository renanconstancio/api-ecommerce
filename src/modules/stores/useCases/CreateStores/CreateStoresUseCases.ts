import { inject, injectable } from 'tsyringe';
import { IStoresRepository } from '@modules/stores/repositories/IStoresRepository';
import { ICreateStore } from '@modules/stores/dtos/ICreateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateStoresUseCases {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute(data: ICreateStore): Promise<StoresEntity> {
    const storeExists = await this.storesRepository.findByFantasyName(
      data.fantasy_name,
    );

    if (storeExists) {
      throw new AppError('There is already one stores with this fantasy name');
    }

    const store = await this.storesRepository.create({
      ...data,
      visible: data.visible ? 1 : 0,
    });

    return store;
  }
}

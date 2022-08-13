import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { ICreateStore } from '../domain/models/ICreateStore';
import { Stores } from '@prisma/client';

@injectable()
export default class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute(data: ICreateStore): Promise<Stores> {
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

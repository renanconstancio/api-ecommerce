import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IStoresRepository } from '../domain/repositories/IStoresRepository';
import { IShowStore } from '../domain/models/IShowStore';
import { IStore } from '../domain/models/IStore';

@injectable()
export default class ShowStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({ id }: IShowStore): Promise<IStore> {
    const store = await this.storesRepository.findById(id);

    if (!store) {
      throw new AppError('Store not found.');
    }

    return store;
  }
}

import { inject, injectable } from 'tsyringe';
import { IPaginateStore } from '../domain/models/IPaginateStore';
import { IStoresRepository } from '../domain/repositories/IStoresRepository';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class ListStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  async execute({ page, limit }: SearchParams): Promise<IPaginateStore> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const stores = await this.storesRepository.findAll({
      page,
      skip,
      take,
    });

    return stores;
  }
}

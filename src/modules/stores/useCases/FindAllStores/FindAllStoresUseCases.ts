import { inject, injectable } from 'tsyringe';
import { IStoreRepository } from '@modules/stores/repositories/IStoreRepository';
import { IPaginateStore } from '@modules/stores/dtos/IPaginateStore';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class FindAllStoresUseCases {
  constructor(
    @inject('StoreRepository')
    private StoreRepository: IStoreRepository,
  ) {}

  async execute({ page, limit }: SearchParams): Promise<IPaginateStore> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const stores = await this.StoreRepository.findAll({
      page,
      skip,
      take,
    });

    return stores;
  }
}

import { IStore } from '../models/IStore';
import { ICreateStore } from '../models/ICreateStore';
import { IStorePaginate } from '../models/IStorePaginate';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IStoresRepository {
  findByFantasyName(fantasy_name: string): Promise<IStore | null>;
  findById(id: string): Promise<IStore | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IStorePaginate>;
  create(data: ICreateStore): Promise<IStore>;
  save(Store: IStore): Promise<IStore>;
  remove(Store: IStore): Promise<void>;
}

import { Stores } from '@prisma/client';
import { ICreateStore } from '../models/ICreateStore';
import { IPaginateStore } from '../models/IPaginateStore';
import { IUpdateStore } from '../models/IUpdateStore';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IStoresRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateStore>;
  findById(id: string): Promise<Stores | null>;
  findByFantasyName(fantasy_name: string): Promise<Stores | null>;

  create(data: ICreateStore): Promise<Stores>;
  update(data: IUpdateStore): Promise<Stores>;
  remove(id: string): Promise<void>;
}

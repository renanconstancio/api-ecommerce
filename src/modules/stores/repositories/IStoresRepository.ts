import { ICreateStore } from '@modules/stores/dtos/ICreateStore';
import { IUpdateStore } from '@modules/stores/dtos/IUpdateStore';
import { IPaginateStore } from '@modules/stores/dtos/IPaginateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IStoreRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateStore>;
  findById(id: string): Promise<StoresEntity | null>;
  findByFantasyName(fantasy_name: string): Promise<StoresEntity | null>;

  create(data: ICreateStore): Promise<StoresEntity>;
  update(data: IUpdateStore): Promise<StoresEntity>;
  remove(id: string): Promise<void>;
}

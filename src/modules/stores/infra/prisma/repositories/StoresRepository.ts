import { prisma } from '@shared/infra/prisma';
import { IStoresRepository } from '@modules/stores/repositories/IStoresRepository';
import { ICreateStore } from '@modules/stores/dtos/ICreateStore';
import { IPaginateStore } from '@modules/stores/dtos/IPaginateStore';
import { IFindStores } from '@modules/stores/dtos/IFindStores';
import { IUpdateStore } from '@modules/stores/dtos/IUpdateStore';
import { StoresEntity } from '@modules/stores/infra/prisma/entities/Stores';
import { Prisma } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class StoresRepository implements IStoresRepository {
  async create(data: ICreateStore): Promise<StoresEntity> {
    return prisma.stores.create({ data: { ...data } });
  }

  async update(data: IUpdateStore): Promise<StoresEntity> {
    return await prisma.stores.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.stores.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findByFantasyName(fantasy_name: string): Promise<StoresEntity | null> {
    const store = prisma.stores.findFirst({
      where: {
        fantasy_name,
        AND: { deleted_at: null },
      },
    });

    return store;
  }

  async findById(id: string): Promise<StoresEntity | null> {
    const store = prisma.stores.findUnique({
      where: {
        id,
      },
    });

    return store;
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IPaginateStore> {
    const where: Prisma.CategoryWhereInput = { deleted_at: null };

    // if (name) where = { ...where, name: name };

    const storesCount = await prisma.stores.count({ where });

    const stores = await prisma.stores.findMany({
      take: take,
      skip: skip,
      where,
    });

    return {
      total: storesCount,
      per_page: take,
      current_page: page,
      data: stores,
    };
  }

  async findAllByIds(stores: IFindStores[]): Promise<StoresEntity[]> {
    return await prisma.stores.findMany({
      where: {
        id: {
          in: stores.map(store => store.id),
        },
      },
    });
  }
}

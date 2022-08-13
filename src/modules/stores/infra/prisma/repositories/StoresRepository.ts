import { prisma } from '@shared/infra/prisma';
import { IStoresRepository } from '@modules/stores/domain/repositories/IStoresRepository';
import { ICreateStore } from '@modules/stores/domain/models/ICreateStore';
import { IPaginateStore } from '@modules/stores/domain/models/IPaginateStore';
import { IFindStores } from '@modules/stores/domain/models/IFindStores';
import { IUpdateStore } from '@modules/stores/domain/models/IUpdateStore';
import { Prisma, Stores } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class StoresRepository implements IStoresRepository {
  async create(data: ICreateStore): Promise<Stores> {
    return prisma.stores.create({ data: { ...data } });
  }

  async update(data: IUpdateStore): Promise<Stores> {
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

  async findByFantasyName(fantasy_name: string): Promise<Stores | null> {
    const store = prisma.stores.findFirst({
      where: {
        fantasy_name,
        AND: { deleted_at: null },
      },
    });

    return store;
  }

  async findById(id: string): Promise<Stores | null> {
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

  async findAllByIds(stores: IFindStores[]): Promise<Stores[]> {
    return await prisma.stores.findMany({
      where: {
        id: {
          in: stores.map(store => store.id),
        },
      },
    });
  }
}

import { Adresses } from '@modules/addresses/infra/prisma/entities/Adresses';
import {
  AdressesParams,
  IAdressesRepository,
} from '@modules/addresses/repositories/IAdressesRepository';
import { ICreateAdresses } from '@modules/addresses/dtos/ICreateAdresses';
import { IUpdateAdresses } from '@modules/addresses/dtos/IUpdateAdresses';
import { IPaginateAdresses } from '@modules/addresses/dtos/IPaginateAdresses';
import { IDeleteAdresses } from '@modules/addresses/dtos/IDeleteAdresses';
import { IFindAdressess } from '@modules/addresses/dtos/IFindAdressess';
import { IFindForSalesAdresses } from '@modules/addresses/dtos/IFindForSalesAdresses';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

export default class AdressesRepository implements IAdressesRepository {
  async create(data: ICreateAdresses): Promise<Adresses> {
    return await prisma.adresses.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateAdresses): Promise<Adresses> {
    return await prisma.adresses.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: IDeleteAdresses): Promise<void> {
    // await prisma.category.softDelete(id);
  }

  async findAll({
    page,
    skip,
    take,
    customers_id,
  }: AdressesParams): Promise<IPaginateAdresses> {
    let where: Prisma.AdressesWhereInput = { deleted_at: null };

    if (customers_id) where = { ...where, customers_id: customers_id };

    const adressesCount = await prisma.adresses.count({ where });

    const adresses = await prisma.adresses.findMany({
      take: take,
      skip: skip,
      where,
    });

    return {
      total: adressesCount,
      per_page: take,
      current_page: page,
      data: adresses,
    };
  }

  async findById({ id }: IFindAdressess): Promise<Adresses | null> {
    return await prisma.adresses.findUnique({
      where: { id },
    });
  }

  async findByForSales({
    customers_id,
    for_sales,
  }: IFindForSalesAdresses): Promise<Adresses | null> {
    return await prisma.adresses.findFirst({
      where: {
        customers_id,
        for_sales,
      },
    });
  }
}

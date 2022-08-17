import {
  CustomersParams,
  ICustomersRepository,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { IPaginateCustomer } from '@modules/customers/domain/dtos/IPaginateCustomer';
import { ICreateCustomer } from '@modules/customers/domain/dtos/ICreateCustomer';
import { IUpdateCustomer } from '@modules/customers/domain/dtos/IUpdateCustomer';
import { CustomersEntity } from '@modules/customers/infra/prisma/etities/Customers';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

export default class CustomersRepository implements ICustomersRepository {
  async create(data: ICreateCustomer): Promise<CustomersEntity> {
    const customer = await prisma.customers.create({
      data: {
        ...data,
      },
    });

    return customer;
  }

  async update(data: IUpdateCustomer): Promise<CustomersEntity> {
    const customer = await prisma.customers.update({
      where: {
        id: data.id,
      },
      data: { ...data },
    });

    return customer;
  }

  async remove(id: string): Promise<void> {
    // await prisma.category.softDelete(id);
  }

  async findAll({
    page,
    skip,
    take,
  }: CustomersParams): Promise<IPaginateCustomer> {
    const where: Prisma.CustomersWhereInput = { deleted_at: null };

    // if (name) where = { ...where, name: name };

    const customersCount = await prisma.customers.count({ where });

    const customers = await prisma.customers.findMany({
      take: take,
      skip: skip,
      where,
    });

    return {
      total: customersCount,
      per_page: take,
      current_page: page,
      data: customers,
    };
  }

  async findByName(name: string): Promise<CustomersEntity | null> {
    return {} as CustomersEntity;
    // const category = await prisma.category.findOneBy({
    //   name,
    // });
    // return category;
  }

  async findById(id: string): Promise<CustomersEntity | null> {
    return {} as CustomersEntity;
    // const category = await prisma.category.findOneBy({
    //   id,
    // });
    // return category;
  }

  async findByEmail(email: string): Promise<CustomersEntity | null> {
    return {} as CustomersEntity;
    // const category = await prisma.category.findOneBy({
    //   id,
    // });
    // return category;
  }
}

import {
  CustomersParams,
  ICustomersRepository,
} from '@modules/customers/repositories/ICustomersRepository';
import { IPaginateCustomer } from '@modules/customers/dtos/IPaginateCustomer';
import { ICreateCustomer } from '@modules/customers/dtos/ICreateCustomer';
import { IUpdateCustomer } from '@modules/customers/dtos/IUpdateCustomer';
import { Customers } from '@modules/customers/infra/prisma/etities/Customers';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';
import { IDeleteCustomer } from '@modules/customers/dtos/IDeleteCustomer';
import { IFindCustomer } from '@modules/customers/dtos/IFindCustomer';

export default class CustomersRepository implements ICustomersRepository {
  async create(data: ICreateCustomer): Promise<Customers> {
    return await prisma.customers.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateCustomer): Promise<Customers> {
    const customer = await prisma.customers.update({
      where: {
        id: data.id,
      },
      data: { ...data },
    });

    return customer;
  }

  async remove(data: IDeleteCustomer): Promise<void> {
    return;
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
      select: {
        id: true,
        email: true,
        name: true,
        birth_date: true,
        cpf: true,
        cnpj: true,
        phone: true,
        avatar: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
      },
      where,
    });

    return {
      total: customersCount,
      per_page: take,
      current_page: page,
      data: customers,
    };
  }

  async findByName(name: string): Promise<Customers | null> {
    return await prisma.customers.findFirst({
      where: {
        name,
      },
    });
  }

  async findById({ id }: IFindCustomer): Promise<Customers | null> {
    return await prisma.customers.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Customers | null> {
    return await prisma.customers.findFirst({
      where: {
        email,
      },
    });
  }
}

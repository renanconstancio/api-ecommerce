import {
  CustomersParams,
  ICustomersRepository,
} from '@modules/customers/repositories/ICustomersRepository';
import { IPaginateCustomer } from '@modules/customers/dtos/IPaginateCustomer';
import { ICreateCustomer } from '@modules/customers/dtos/ICreateCustomer';
import { IUpdateCustomer } from '@modules/customers/dtos/IUpdateCustomer';
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

  async findByName(name: string): Promise<CustomersEntity | null> {
    return {} as CustomersEntity;
    // const category = await prisma.category.findOneBy({
    //   name,
    // });
    // return category;
  }

  async findById(id: string): Promise<CustomersEntity | null> {
    return await prisma.customers.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<CustomersEntity | null> {
    const category = await prisma.customers.findFirst({
      where: {
        email,
      },
    });
    return category;
  }
}

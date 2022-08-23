import { Sales } from '@modules/sales/infra/prisma/entities/Sales';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { IPaginateSales } from '@modules/sales/dtos/IPaginateSales';
import { ICreateSales } from '@modules/sales/dtos/ICreateSales';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class SalesRepository implements ISalesRepository {
  async findById(id: string): Promise<Sales | null> {
    return {} as Sales;
    // return prisma.sales.findFirst({
    //   where: { id },
    //   include: {
    //     sales_transactions: true,
    //   },
    // });
  }

  async findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales> {
    const where: Prisma.SalesWhereInput = { deleted_at: null };

    const salesCount = await prisma.sales.count({ where });

    const sales = await prisma.sales.findMany({
      take: take,
      skip: skip,
      where,
      select: {
        id: true,
        code: true,
        date_of_sale: true,
        customer: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            cpf: true,
            cnpj: true,
            birth_date: true,
            avatar: true,
          },
        },
        products: {
          select: {
            quantity: true,
            price_paid: true,
            sku: {
              select: {
                sku: true,
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        addresses: true,
        transactions: true,
      },
    });

    return {
      total: salesCount,
      per_page: take,
      current_page: page,
      data: sales,
    };
  }

  async create(data: ICreateSales): Promise<Sales> {
    const { customers_id } = data;

    const codeSale = await this.nextSalesCode();

    const dateOfSale = new Date();

    return prisma.sales.create({
      data: {
        code: codeSale,
        date_of_sale: dateOfSale,
        customers_id,
      },
    }) as unknown as Sales;
  }

  async nextSalesCode(): Promise<string> {
    return `00000000${await prisma.sales.count()}`.substring(-8);
  }
}

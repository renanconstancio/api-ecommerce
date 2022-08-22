import { ISalesProductsRepository } from '@modules/sales/repositories/ISalesProductsRepository';
import { ProductsSkusEntity } from '@modules/products/infra/prisma/entities/ProductsSkus';
import { IFindSalesProducts } from '@modules/sales/dtos/IFindSalesProducts';
import { ICreateSalesProducts } from '@modules/sales/dtos/ICreateSalesProducts';
import { IUpdateStockSalesProducts } from '@modules/sales/dtos/IUpdateStockSalesProducts';
import { SalesProductsEntity } from '@modules/sales/infra/prisma/entities/SalesProducts';
import { prisma } from '@shared/infra/prisma';

export default class SalesProductsRepository
  implements ISalesProductsRepository
{
  async findAllByIds(ids: IFindSalesProducts[]): Promise<ProductsSkusEntity[]> {
    const existentProductsSkus = await prisma.productsSkus.findMany({
      where: {
        id: { in: ids.map(sku => sku.id) },
      },
    });

    return existentProductsSkus;
  }

  async updateStock(skus: IUpdateStockSalesProducts[]): Promise<void> {
    const updateProductsSkusMassive = skus.map(rws =>
      prisma.productsSkus.update({
        where: { id: rws.id },
        data: {
          quantity: rws.quantity,
        },
      }),
    );

    await Promise.all(updateProductsSkusMassive);
  }

  async create(data: ICreateSalesProducts): Promise<SalesProductsEntity> {
    return {} as SalesProductsEntity;
    // const order = prisma.sales.create({
    //   customer,
    //   order_products: products,
    // });
    // await prisma.sales.save(order);
    // return order;
  }

  // async findById(id: string): Promise<SalesEntity | null> {
  //   return {} as SalesEntity;
  //   '// return prisma.sales.findFirst({'
  //   //   where: { id },
  //   //   include: {
  //   //     sales_transactions: true,
  //   //   },
  //   // });
  // }
  // async findAll({ page, skip, take }: SearchParams): Promise<IPaginateSales> {
  //   const where: Prisma.SalesWhereInput = { deleted_at: null };
  //   const sales = await prisma.sales.findMany({
  //     take: take,
  //     skip: skip,
  //     where,
  //     include: {
  //       addresses: true,
  //       customer: true,
  //       products: true,
  //       transactions: true,
  //     },
  //   });
  //   return {
  //     total: 1,
  //     per_page: take,
  //     current_page: page,
  //     data: sales,
  //   };
  //   // return result;
  // }
  // async create({ customer, products }: ICreateSales): Promise<SalesEntity> {
  //   return {} as SalesEntity;
  //   // const order = prisma.sales.create({
  //   //   customer,
  //   //   order_products: products,
  //   // });
  //   // await prisma.sales.save(order);
  //   // return order;
  // }
}

import { ProductsSkus } from '@modules/products/infra/prisma/dtos/productSku';
import { ISalesProductsRepository } from '@modules/sales/repositories/ISalesProductsRepository';
import { IUpdateStockSalesProducts } from '@modules/sales/dtos/IUpdateStockSalesProducts';
import { ICreateSalesProducts } from '@modules/sales/dtos/ICreateSalesProducts';
import { IFindSalesProducts } from '@modules/sales/dtos/IFindSalesProducts';
import { prisma } from '@shared/infra/prisma';

export default class SalesProductsRepository
  implements ISalesProductsRepository
{
  async findAllByIds(ids: IFindSalesProducts[]): Promise<ProductsSkus[]> {
    const existentProductsSkus = await prisma.productsSkus.findMany({
      where: {
        id: { in: ids.map(sku => sku.id) },
      },
      include: {
        product: true,
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

  async create(data: ICreateSalesProducts[]): Promise<void> {
    const createProductsSkusMassive = data.map(rws =>
      prisma.salesProducts.create({
        data: {
          sales_id: rws.sales_id,
          produtcts_skus_id: rws.products_skus_id,
          price_paid: rws.price_paid,
          quantity: rws.quantity,
        },
      }),
    );

    await Promise.all(createProductsSkusMassive);
  }
}

import { prisma } from '@shared/infra/prisma';
import { IUpdateStockProductsSkus } from '@modules/products/dtos/IUpdateStockProductsSkus';
import { IProductsSkusRepository } from '@modules/products/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '@modules/products/dtos/ICreateProductSku';
import { IUpdateProductSku } from '@modules/products/dtos/IUpdateProductSku';
import { ProductsSkus } from '@modules/products/infra/prisma/entities/ProductsSkus';
import { Products } from '@modules/products/infra/prisma/entities/Products';
import { IFindProductsSkus } from '@modules/products/dtos/IFindProductsSkus';

export default class ProductsSkusRepository implements IProductsSkusRepository {
  async create(data: ICreateProductSku): Promise<ProductsSkus> {
    return prisma.productsSkus.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateProductSku): Promise<ProductsSkus> {
    return await prisma.productsSkus.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.productsSkus.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findBySku(sku: string): Promise<ProductsSkus | null> {
    return (await prisma.productsSkus.findFirst({
      where: {
        sku,
      },
    })) as ProductsSkus;
  }

  async findAllByIds(ids: IFindProductsSkus[]): Promise<ProductsSkus[]> {
    const existentProductsSkus = await prisma.productsSkus.findMany({
      where: {
        id: { in: ids.map(sku => sku.id) },
      },
    });

    return existentProductsSkus as ProductsSkus[];
  }

  async findById(product_id: string, id: string): Promise<Products | null> {
    return (await prisma.products.findUnique({
      where: {
        id: product_id,
      },
      include: {
        skus: {
          where: {
            id: id,
          },
          include: {
            images: {
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    })) as Products;
  }

  // async findByIdSku(sku: string): Promise<ProductsSkus | null> {
  //   return await prisma.productsSkus.findFirst({
  //     where: {
  //       sku,
  //     },
  //   });
  // }

  async findAll(product_id: string): Promise<Products | null> {
    return await prisma.products.findFirst({
      where: {
        id: product_id,
      },
      include: {
        skus: true,
      },
    });
  }

  async updateStock(products: IUpdateStockProductsSkus[]): Promise<void> {
    const updateProductsSkusMassive = products.map(rws =>
      prisma.productsSkus.update({
        where: { id: rws.id },
        data: {
          quantity: rws.quantity,
        },
      }),
    );

    await Promise.all(updateProductsSkusMassive);
  }
}

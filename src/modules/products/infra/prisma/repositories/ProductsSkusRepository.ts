import { prisma } from '@shared/infra/prisma';
import { Products, ProductsSkus } from '@prisma/client';
import { IUpdateStockProductsSkus } from '@modules/products/domain/models/IUpdateStockProductsSkus';
import { IProductsSkusRepository } from '@modules/products/domain/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '@modules/products/domain/models/ICreateProductSku';
import { IUpdateProductSku } from '@modules/products/domain/models/IUpdateProductSku';

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
    return await prisma.productsSkus.findFirst({
      where: {
        sku,
      },
    });
  }

  async findById(product_id: string, id: string): Promise<Products | null> {
    return await prisma.products.findFirst({
      where: {
        id: product_id,
      },
      include: {
        skus: {
          include: {
            images: {
              orderBy: {
                position: 'asc',
              },
            },
          },
          where: {
            id,
          },
        },
      },

      // order: {
      //   skus: {
      //     images: {
      //       position: 'ASC',
      //     },
      //   },
      // },
    });
  }

  async findByIdSku(sku: string): Promise<ProductsSkus | null> {
    return await prisma.productsSkus.findFirst({
      where: {
        sku,
      },
    });
  }

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

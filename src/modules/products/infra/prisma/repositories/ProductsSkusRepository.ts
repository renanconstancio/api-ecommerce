import { prisma } from '@shared/infra/prisma';
import { IUpdateStockProductsSkus } from '@modules/products/domain/dtos/IUpdateStockProductsSkus';
import { IProductsSkusRepository } from '@modules/products/domain/repositories/IProductsSkusRepository';
import { ICreateProductSku } from '@modules/products/domain/dtos/ICreateProductSku';
import { IUpdateProductSku } from '@modules/products/domain/dtos/IUpdateProductSku';
import { ProductsSkusEntity } from '../entities/ProductsSkus';
import { ProductsEntity } from '../entities/Products';

export default class ProductsSkusRepository implements IProductsSkusRepository {
  async create(data: ICreateProductSku): Promise<ProductsSkusEntity> {
    return prisma.productsSkus.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateProductSku): Promise<ProductsSkusEntity> {
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

  async findBySku(sku: string): Promise<ProductsSkusEntity | null> {
    return await prisma.productsSkus.findFirst({
      where: {
        sku,
      },
    });
  }

  async findById(
    product_id: string,
    id: string,
  ): Promise<ProductsEntity | null> {
    return await prisma.products.findUnique({
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
    });
  }

  // async findByIdSku(sku: string): Promise<ProductsSkusEntity | null> {
  //   return await prisma.productsSkus.findFirst({
  //     where: {
  //       sku,
  //     },
  //   });
  // }

  async findAll(product_id: string): Promise<ProductsEntity | null> {
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

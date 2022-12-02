import { prisma } from '@shared/infra/prisma';
import { IProductSkuRepository } from '@modules/products/infra/repositories/IProductSkuRepository';
import { ProductSkuStockDTOs } from '../dtos/productSkuStockDTOs';
import { ProductSkuDTOs } from '../dtos/productSkuDTOs';
import { dateString } from '@shared/utils/functions';
import { ProductDTOs } from '../dtos/productDTOs';

export default class ProductSkuRepository implements IProductSkuRepository {
  async save(data: ProductSkuDTOs): Promise<ProductSkuDTOs> {
    const handleData = {
      product_id: data.product_id,
      sku: data.sku,
      codebar: data.codebar,
      price: data.price,
      cost_price: data.cost_price,
      sale_price: data.sale_price,
      quantity: data.quantity,
    };

    if (data.id)
      return await prisma.productsSkus
        .update({
          where: {
            id: data.id,
          },
          data: { ...handleData },
        })
        .then(({ ...sku }) => ({
          ...sku,
          created_at: dateString(sku.created_at as Date),
          updated_at: dateString(sku.updated_at as Date),
          deleted_at: sku.deleted_at && dateString(sku.deleted_at),
        }));

    return await prisma.productsSkus
      .create({
        data: { ...handleData },
      })
      .then(({ ...sku }) => ({
        ...sku,
        created_at: dateString(sku.created_at as Date),
        updated_at: dateString(sku.updated_at as Date),
        deleted_at: sku.deleted_at && dateString(sku.deleted_at),
      }));
  }

  async remove(id: string): Promise<void> {
    await prisma.productsSkus.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findBySku(sku: string): Promise<ProductSkuDTOs | null> {
    return (await prisma.productsSkus
      .findFirst({
        where: {
          sku,
        },
        include: {
          images: {
            orderBy: {
              position: 'asc',
            },
          },
        },
      })
      .then(({ ...sku }) => ({
        ...sku,
        created_at: dateString(sku.created_at as Date),
        updated_at: dateString(sku.updated_at as Date),
        deleted_at: sku.deleted_at && dateString(sku.deleted_at),
        images: sku?.images?.map(({ image, id }) => ({
          id: id,
          image_lg: `${process.env.APP_API_URL}/images/${image}`,
          image_md: `${process.env.APP_API_URL}/images/md/${image}`,
          image_xs: `${process.env.APP_API_URL}/images/xs/${image}`,
        })),
      }))) as ProductSkuDTOs;
  }

  async findById({
    id,
    product_id,
  }: {
    id: string;
    product_id: string;
  }): Promise<ProductDTOs | null> {
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
    })) as ProductDTOs;
  }

  async updateStock(skus: ProductSkuStockDTOs[]): Promise<void> {
    const updateProductsSkusMassive = skus.map((rws) =>
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

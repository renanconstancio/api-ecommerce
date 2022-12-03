import { prisma } from '@shared/infra/prisma';
import { IProductSkuRepository } from '@modules/productsSkus/infra/interfaces/IProductSkuRepository';
import { ProductSkuStockDTOs } from '../../../../products/dtos/productSkuStockDTOs';
import { ProductSkuDTOs } from '../../../dtos/productSkuDTOs';
import { dateString } from '@shared/utils/functions';
import { ProductDTOs } from '@modules/products/dtos/productDTOs';

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
    return (await prisma.productsSkus.findFirst({
      where: {
        deleted_at: null,
        sku,
      },
    })) as ProductSkuDTOs;
  }

  async findById(id: string): Promise<ProductSkuDTOs | null> {
    return (await prisma.productsSkus.findFirst({
      where: {
        deleted_at: null,
        id,
      },
    })) as ProductSkuDTOs;
  }

  async findByIdSku(
    product_id: string,
    id: string,
  ): Promise<ProductDTOs | null> {
    return (await prisma.products
      .findFirst({
        where: {
          deleted_at: null,
          id: product_id,
        },
        include: {
          skus: {
            where: {
              deleted_at: null,
              id,
            },
            include: {
              images: {
                where: {
                  deleted_at: null,
                },
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
        },
      })
      .then(({ ...prod }) => ({
        ...prod,
        created_at: prod.created_at && dateString(prod.created_at),
        updated_at: prod.updated_at && dateString(prod.updated_at),
        deleted_at: prod.deleted_at && dateString(prod.deleted_at),
        skus: prod.skus?.map(({ ...skus }) => ({
          ...skus,
          price: (skus.price.toNumber() * 1).toFixed(2),
          cost_price: (skus.cost_price.toNumber() * 1).toFixed(2),
          sale_price: (skus.sale_price.toNumber() * 1).toFixed(2),
          created_at: dateString(skus.created_at as Date),
          updated_at: dateString(skus.updated_at as Date),
          deleted_at: skus.deleted_at && dateString(skus.deleted_at),
          images: skus?.images?.map((image) => ({
            id: image.id,
            image_lg: `${process.env.APP_API_URL}/images/${image.image}`,
            image_md: `${process.env.APP_API_URL}/images/md/${image.image}`,
            image_xs: `${process.env.APP_API_URL}/images/xs/${image.image}`,
          })),
        }))[0],
      }))) as ProductDTOs | null;
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

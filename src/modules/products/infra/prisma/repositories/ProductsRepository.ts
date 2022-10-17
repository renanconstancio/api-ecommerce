import { format } from 'date-fns';
import { IFindProducts } from '@modules/products/dtos/IFindProducts';
import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IRequestProduct } from '@modules/products/dtos/IRequestProduct';
import { IResponseProduct } from '@modules/products/dtos/IResponseProduct';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export default class ProductsRepository implements IProductsRepository {
  async save(data: IRequestProduct): Promise<IResponseProduct> {
    if (data.id)
      return await prisma.products.update({
        data,
        where: {
          id: data.id,
        },
      });

    return await prisma.products.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.products.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findByName(name: string): Promise<IResponseProduct | null> {
    return await prisma.products.findFirst({
      where: {
        name,
        AND: { deleted_at: null },
      },
    });
  }

  async findById(id: string): Promise<IResponseProduct | null> {
    return (await prisma.products
      .findUnique({
        where: {
          id,
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
          },
        },
      })
      .then(({ ...prod }) => ({
        ...prod,
        created_at: format(prod.created_at, 'yyyy-MM-dd HH:ii:ss'),
        updated_at: format(prod.updated_at, 'yyyy-MM-dd HH:ii:ss'),
        deleted_at:
          prod.deleted_at && format(prod.deleted_at, 'yyyy-MM-dd HH:ii:ss'),
        skus: prod.skus?.map(({ images, ...skus }) => {
          return {
            ...skus,
            created_at: format(skus.created_at, 'yyyy-MM-dd HH:ii:ss'),
            updated_at: format(skus.updated_at, 'yyyy-MM-dd HH:ii:ss'),
            deleted_at:
              skus.deleted_at && format(skus.deleted_at, 'yyyy-MM-dd HH:ii:ss'),
            images: images?.map(({ id, image }) => {
              return {
                id: id,
                image_lg: `${process.env.BASE_AVATAR_URL}/images/${image}`,
                image_md: `${process.env.BASE_AVATAR_URL}/images/md/${image}`,
                image_xs: `${process.env.BASE_AVATAR_URL}/images/xs/${image}`,
              };
            }),
          };
        }),
      }))) as IResponseProduct;
  }

  async findAll({
    page,
    skip,
    take,
    name,
  }: SearchParams): Promise<IPaginateProducts> {
    let where: Prisma.ProductsWhereInput = { deleted_at: null };

    if (name) where = { ...where, name: name };

    const productsCount = await prisma.products.count({ where });

    const products = (await prisma.products
      .findMany({
        include: {
          skus: {
            include: {
              images: {
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
        },
        take: take,
        skip: skip,
        where,
      })
      .then(products =>
        products.map(({ skus, ...prod }) => {
          return {
            ...prod,
            created_at: format(prod.created_at, 'yyyy-MM-dd HH:ii:ss'),
            updated_at: format(prod.updated_at, 'yyyy-MM-dd HH:ii:ss'),
            deleted_at:
              prod.deleted_at && format(prod.deleted_at, 'yyyy-MM-dd HH:ii:ss'),
            skus: skus.map(({ images, ...skus }) => {
              return {
                ...skus,
                created_at: format(skus.created_at, 'yyyy-MM-dd HH:ii:ss'),
                updated_at: format(skus.updated_at, 'yyyy-MM-dd HH:ii:ss'),
                deleted_at:
                  skus.deleted_at &&
                  format(skus.deleted_at, 'yyyy-MM-dd HH:ii:ss'),
                images: images.map(({ id, image }) => {
                  return {
                    id: id,
                    image_lg: `${process.env.BASE_AVATAR_URL}/images/${image}`,
                    image_md: `${process.env.BASE_AVATAR_URL}/images/md/${image}`,
                    image_xs: `${process.env.BASE_AVATAR_URL}/images/xs/${image}`,
                  };
                }),
              };
            }),
          };
        }),
      )) as IResponseProduct[];

    return {
      total: productsCount,
      per_page: take,
      current_page: page,
      data: products,
    };
  }

  async findAllByIds(products: IFindProducts[]): Promise<IResponseProduct[]> {
    const existentProducts = await prisma.products.findMany({
      where: {
        id: { in: products.map(product => product.id) },
      },
    });

    return existentProducts;
  }
}

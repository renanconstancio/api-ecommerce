import { prisma } from '@shared/infra/prisma';
import { IProductRepository } from '@modules/products/repositories/IProductRepository';
import { PaginationDTOs } from '../dtos/paginationDTOs';
import { ProductDTOs } from '../dtos/productDTOs';
import { RequestDTOs } from '../dtos/requestDTOs';
import { dateString } from '@shared/utils/functions';

export default class ProductRepository implements IProductRepository {
  async save(data: ProductDTOs): Promise<ProductDTOs> {
    if (data.id)
      return await prisma.products.update({
        where: {
          id: data.id,
        },
        data,
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

  async findByName(name: string): Promise<ProductDTOs | null> {
    return await prisma.products.findFirst({
      where: {
        name,
        AND: { deleted_at: null },
      },
    });
  }

  async findById(id: string): Promise<ProductDTOs | null> {
    return await prisma.products
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
        created_at: dateString(prod.created_at),
        updated_at: dateString(prod.updated_at),
        deleted_at: prod.deleted_at && dateString(prod.deleted_at),
        skus: prod.skus?.map(({ ...skus }) => ({
          ...skus,
          created_at: dateString(skus.created_at),
          updated_at: dateString(skus.updated_at),
          deleted_at: skus.deleted_at && dateString(skus.deleted_at),
          images: skus?.images?.map(({ id, image }) => ({
            id: id,
            image_lg: `${process.env.APP_API_URL}/images/${image}`,
            image_md: `${process.env.APP_API_URL}/images/md/${image}`,
            image_xs: `${process.env.APP_API_URL}/images/xs/${image}`,
          })),
        })),
      }));
  }

  async findAll({
    limit,
    order,
    page,
    search,
  }: RequestDTOs): Promise<PaginationDTOs<ProductDTOs[]>> {
    const where = { deleted_at: null };

    // if (name) where = { ...where, name: name };

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
        take: limit,
        skip: (Number(page) - 1) * page,
        where,
      })
      .then(products =>
        products.map(({ skus, ...prod }) => {
          return {
            ...prod,
            created_at: dateString(prod.created_at),
            updated_at: dateString(prod.updated_at),
            deleted_at: prod.deleted_at && dateString(prod.deleted_at),
            skus: skus.map(({ images, ...skus }) => {
              return {
                ...skus,
                created_at: dateString(skus.created_at),
                updated_at: dateString(skus.updated_at),
                deleted_at: skus.deleted_at && dateString(skus.deleted_at),
                images: images.map(({ id, image }) => {
                  return {
                    id: id,
                    image_lg: `${process.env.APP_API_URL}/images/${image}`,
                    image_md: `${process.env.APP_API_URL}/images/md/${image}`,
                    image_xs: `${process.env.APP_API_URL}/images/xs/${image}`,
                  };
                }),
              };
            }),
          };
        }),
      )) as IResponseProduct[];

    return {
      limit,
      page,
      total: productsCount,
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

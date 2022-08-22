import { IFindProducts } from '@modules/products/dtos/IFindProducts';
import { ICreateProduct } from '@modules/products/dtos/ICreateProduct';
import { IUpdateProduct } from '@modules/products/dtos/IUpdateProduct';
import { IPaginateProducts } from '@modules/products/dtos/IPaginateProducts';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { Products } from '@modules/products/infra/prisma/entities/Products';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
  name: string;
};

export default class ProductsRepository implements IProductsRepository {
  async create(data: ICreateProduct): Promise<Products> {
    return await prisma.products.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateProduct): Promise<Products> {
    return await prisma.products.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.products.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findByName(name: string): Promise<Products | null> {
    return await prisma.products.findFirst({
      where: {
        name,
        AND: { deleted_at: null },
      },
    });
  }

  async findById(id: string): Promise<Products | null> {
    return (await prisma.products.findUnique({
      where: {
        id,
      },
      include: {
        skus: {
          include: {
            images: {
              select: {
                image: true,
              },
              orderBy: {
                position: 'asc',
              },
            },
          },
        },
      },
    })) as Products | null;
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

    const products = (await prisma.products.findMany({
      include: {
        skus: {
          include: {
            images: {
              select: {
                image: true,
              },
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
    })) as Products[];

    return {
      total: productsCount,
      per_page: take,
      current_page: page,
      data: products,
    };
  }

  async findAllByIds(products: IFindProducts[]): Promise<Products[]> {
    const existentProducts = await prisma.products.findMany({
      where: {
        id: { in: products.map(product => product.id) },
      },
    });

    return existentProducts;
  }
}

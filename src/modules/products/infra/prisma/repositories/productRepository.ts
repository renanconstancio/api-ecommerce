import { prisma } from '@shared/infra/prisma';
import { IProductRepository } from '@modules/products/infra/interfaces/IProductRepository';
import { PaginationDTOs } from '../../../dtos/paginationDTOs';
import { ProductDTOs } from '../../../dtos/productDTOs';
import { RequestDTOs } from '../../../dtos/requestDTOs';
import { dateString } from '@shared/utils/functions';

export default class ProductRepository implements IProductRepository {
  async save(data: ProductDTOs): Promise<ProductDTOs> {
    const handleData = {
      name: data.name,
      keywords: data.keywords,
      visible: data.visible,
      description: data.description,
      description_text: data.description_text,
    };

    if (data.id)
      return await prisma.products
        .update({
          where: {
            id: data.id,
          },
          data: { ...handleData },
        })
        .then(({ ...prod }) => ({
          ...prod,
          created_at: dateString(prod.created_at as Date),
          updated_at: dateString(prod.updated_at as Date),
          deleted_at: prod.deleted_at && dateString(prod.deleted_at),
        }));

    return await prisma.products
      .create({
        data: { ...handleData },
      })
      .then(({ ...prod }) => ({
        ...prod,
        created_at: dateString(prod.created_at as Date),
        updated_at: dateString(prod.updated_at as Date),
        deleted_at: prod.deleted_at && dateString(prod.deleted_at),
      }));
  }

  async delete(id: string): Promise<void> {
    await prisma.products.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findByName(name: string): Promise<ProductDTOs | null> {
    return (await prisma.products.findFirst({
      where: {
        name,
        AND: { deleted_at: null },
      },
    })) as ProductDTOs;
  }

  async findById(id: string): Promise<ProductDTOs | null> {
    return (await prisma.products
      .findFirst({
        where: {
          id,
          deleted_at: null,
        },
        include: {
          skus: {
            where: {
              deleted_at: null,
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
        })),
      }))) as ProductDTOs | null;
  }

  async findByAll({
    limit,
    page,
    order,
    search,
  }: RequestDTOs): Promise<PaginationDTOs<ProductDTOs[]>> {
    const whereOr = [];

    if (search && search.name)
      whereOr.push({ name: { contains: search.name } });

    let handleWhere = {};
    if (whereOr.length) handleWhere = { OR: whereOr };

    const orderBy = [];
    if (order && order.name)
      orderBy.push({ name: order.name === 'asc' ? 'asc' : 'desc' });

    let handleOrder = {};
    if (orderBy.length) handleOrder = orderBy;

    const productsCount = await prisma.products.count({
      where: { ...handleWhere, deleted_at: null },
    });

    const products = (await prisma.products
      .findMany({
        where: { ...handleWhere, deleted_at: null },
        orderBy: handleOrder,
        skip: Number(limit * Number(page) - 1),
        take: limit,
        include: {
          skus: {
            where: {
              deleted_at: null,
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
      .then((products) =>
        products.map(({ ...prod }) => ({
          ...prod,
          created_at: dateString(prod.created_at as Date),
          updated_at: dateString(prod.updated_at as Date),
          deleted_at: prod?.deleted_at && dateString(prod.deleted_at as Date),
          skus: prod?.skus?.map(({ ...skus }) => {
            return {
              ...skus,
              price: (skus.price.toNumber() * 1).toFixed(2),
              cost_price: (skus.cost_price.toNumber() * 1).toFixed(2),
              sale_price: (skus.sale_price.toNumber() * 1).toFixed(2),
              created_at: dateString(skus.created_at as Date),
              updated_at: dateString(skus.updated_at as Date),
              deleted_at: skus.deleted_at && dateString(skus.deleted_at),
              images: skus?.images?.map(({ id, image }) => {
                return {
                  id: id,
                  image_lg: `${process.env.APP_API_URL}/images/${image}`,
                  image_md: `${process.env.APP_API_URL}/images/md/${image}`,
                  image_xs: `${process.env.APP_API_URL}/images/xs/${image}`,
                };
              }),
            };
          }),
        })),
      )) as ProductDTOs[];

    return {
      limit,
      page,
      total: productsCount,
      data: products,
    };
  }
}

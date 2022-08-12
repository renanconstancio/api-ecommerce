import { prisma } from '@shared/infra/prisma';
import { ICreateCategory } from '@modules/categories/domain/models/ICreateCategory';
import { IPaginateCategory } from '@modules/categories/domain/models/IPaginateCategory';
import { ISearchCategory } from '@modules/categories/domain/models/ISearchCategory';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { IUpdateCategory } from '@modules/categories/domain/models/IUpdateCategory';
import { Category, Prisma } from '@prisma/client';

export default class CategoriesRepository implements ICategoriesRepository {
  async create(data: ICreateCategory): Promise<Category> {
    return await prisma.category.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateCategory): Promise<Category> {
    return await prisma.category.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    // const formatedMysqlString = new Date(
    //   new Date(new Date(new Date()).toISOString()).getTime() -
    //     new Date().getTimezoneOffset() * 60000,
    // )
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace('T', ' ');

    await prisma.category.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }

  async findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory> {
    let where: Prisma.CategoryWhereInput = { deleted_at: null };

    if (name) where = { ...where, name: name };

    const categoriesCount = await prisma.category.count({ where });

    const categories = await prisma.category.findMany({
      include: {
        category: true,
      },
      take: take,
      skip: skip,
      where,
    });

    return {
      total: categoriesCount,
      per_page: take,
      current_page: page,
      data: categories,
    };
  }

  async findById(id: string): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: {
        id,
        AND: { deleted_at: null },
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await prisma.category.findFirst({
      where: { name, AND: { deleted_at: null } },
    });
  }
}

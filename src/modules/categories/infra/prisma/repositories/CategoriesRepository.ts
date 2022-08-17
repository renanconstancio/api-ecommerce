import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import { IPaginateCategory } from '@modules/categories/dtos/IPaginateCategory';
import { ISearchCategory } from '@modules/categories/dtos/ISearchCategory';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { IUpdateCategory } from '@modules/categories/dtos/IUpdateCategory';
import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import { prisma } from '@shared/infra/prisma';
import { Prisma } from '@prisma/client';

export default class CategoriesRepository implements ICategoriesRepository {
  async create(data: ICreateCategory): Promise<CategoryEntity> {
    return await prisma.category.create({
      data: {
        ...data,
      },
    });
  }

  async update(data: IUpdateCategory): Promise<CategoryEntity> {
    return await prisma.category.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: string): Promise<void> {
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

  async findById(id: string): Promise<CategoryEntity | null> {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    return await prisma.category.findFirst({
      where: { name, AND: { deleted_at: null } },
    });
  }
}

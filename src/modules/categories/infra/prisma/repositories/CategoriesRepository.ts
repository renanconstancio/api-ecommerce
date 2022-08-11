import { ICreateCategory } from '@modules/categories/domain/models/ICreateCategory';
import { IPaginateCategory } from '@modules/categories/domain/models/IPaginateCategory';
import { ISearchCategory } from '@modules/categories/domain/models/ISearchCategory';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { Category } from '@prisma/client';
import { prisma } from '@shared/infra/prisma';

export default class CategoriesRepository implements ICategoriesRepository {
  async create({
    category_id,
    name,
    description,
    keywords,
    position,
  }: ICreateCategory): Promise<Category> {
    const category = await prisma.category.create({
      category_id,
      name,
      description,
      keywords,
      position,
    });

    return category;
  }

  async save(data: Category): Promise<Category> {
    await prisma.category.save(data);

    return data;
  }

  async remove(id: string): Promise<void> {
    await prisma.category.softDelete(id);
  }

  async findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory> {
    const where = {} as { [key: string]: unknown };

    if (name) where.name = Like(`%${name}%`);

    const [categories, count] = await prisma.category.findAndCount({
      take: take,
      skip: skip,
      where,
    });

    const result = {
      total: count,
      per_page: take,
      current_page: page,
      data: categories,
    };

    return result;
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findOneBy({
      id,
    });

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findOneBy({
      name,
    });

    return category;
  }
}

import { v4 as uuidv4 } from 'uuid';
import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import { IPaginateCategory } from '@modules/categories/dtos/IPaginateCategory';
import { IUpdateCategory } from '@modules/categories/dtos/IUpdateCategory';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: CategoryEntity[] = [];

  async create(data: ICreateCategory): Promise<CategoryEntity> {
    const category = {} as CategoryEntity;

    category.id = uuidv4();
    category.name = data.name;
    category.description = data.description;
    category.keywords = data.keywords;
    category.position = data.position;
    category.category_id = data.category_id ?? '';

    this.categories.push(category);

    return category;
  }

  async update(data: IUpdateCategory): Promise<CategoryEntity> {
    Object.assign(this.categories, data);

    return data as CategoryEntity;
  }

  async remove(id: string): Promise<void> {
    this.categories.find(categories => categories.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateCategory> {
    return {} as IPaginateCategory;
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const category = this.categories.find(categories => categories.id === id);

    return category as CategoryEntity;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const category = this.categories.find(
      categories => categories.name === name,
    );

    return category as CategoryEntity;
  }
}

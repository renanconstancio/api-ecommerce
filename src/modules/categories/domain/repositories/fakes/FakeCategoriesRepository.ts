import { v4 as uuidv4 } from 'uuid';
import { ICreateCategory } from '@modules/categories/domain/models/ICreateCategory';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { IPaginateCategory } from '../../models/IPaginateCategory';
import { Category } from '@prisma/client';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategory): Promise<Category> {
    const category = {} as Category;

    category.id = uuidv4();
    category.name = data.name;
    category.description = data.description;
    category.keywords = data.keywords;
    category.position = data.position;
    category.category_id = data.category_id ?? '';

    this.categories.push(category);

    return category;
  }

  async update(data: Category): Promise<Category> {
    Object.assign(this.categories, data);

    return data;
  }

  async remove(id: string): Promise<void> {
    this.categories.find(categories => categories.id !== id);
    return;
  }

  async findAll(): Promise<IPaginateCategory> {
    return {} as IPaginateCategory;
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find(categories => categories.id === id);

    return category as Category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find(
      categories => categories.name === name,
    );

    return category as Category;
  }
}

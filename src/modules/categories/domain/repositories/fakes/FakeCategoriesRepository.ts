import { v4 as uuidv4 } from 'uuid';
import { ICreateCategory } from '@modules/categories/domain/models/ICreateCategory';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { Category } from '@modules/categories/infra/typeorm/entities/Category';
import { IPaginateCategory } from '../../models/IPaginateCategory';

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({
    category_id,
    name,
    description,
    keywords,
    position,
  }: ICreateCategory): Promise<Category> {
    const category = new Category();

    category.id = uuidv4();
    category.category_id = category_id ?? '';
    category.name = name;
    category.description = description;
    category.keywords = keywords;
    category.position = position;

    this.categories.push(category);

    return category;
  }

  async save(data: Category): Promise<Category> {
    Object.assign(this.categories, data);

    return data;
  }

  async remove(data: Category): Promise<void> {
    // const category = this.categories.find(
    //   categories => categories.id !== data.id,
    // );

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

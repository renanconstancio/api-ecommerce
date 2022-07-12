import { ICreateCategory } from '@modules/categories/domain/models/ICreateCategory';
import { IPaginateCategory } from '@modules/categories/domain/models/IPaginateCategory';
import { ISearchCategory } from '@modules/categories/domain/models/ISearchCategory';
import { ICategoriesRepository } from '@modules/categories/domain/repositories/ICategoriesRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Like, Repository } from 'typeorm';
import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Category);
  }

  async create({
    category_id,
    name,
    description,
    keywords,
    position,
  }: ICreateCategory): Promise<Category> {
    const category = this.ormRepository.create({
      category_id,
      name,
      description,
      keywords,
      position,
    });

    await this.ormRepository.save(category);

    return category;
  }

  async save(data: Category): Promise<Category> {
    await this.ormRepository.save(data);

    return data;
  }

  async remove(data: Category): Promise<void> {
    await this.ormRepository.remove(data);
  }

  async findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory> {
    const where = {} as { [key: string]: unknown };

    if (name) where.name = Like(`%${name}%`);

    const [categories, count] = await this.ormRepository.findAndCount({
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
    const category = await this.ormRepository.findOneBy({
      id,
    });

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.ormRepository.findOneBy({
      name,
    });

    return category;
  }
}

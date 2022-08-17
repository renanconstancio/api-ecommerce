import { CategoryEntity } from '@modules/categories/infra/prisma/entities/Category';
import { IPaginateCategory } from '@modules/categories/dtos/IPaginateCategory';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import { ISearchCategory } from '@modules/categories/dtos/ISearchCategory';
import { IUpdateCategory } from '@modules/categories/dtos/IUpdateCategory';

export interface ICategoriesRepository {
  findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory>;
  findByName(name: string): Promise<CategoryEntity | null>;
  findById(id: string): Promise<CategoryEntity | null>;
  create(data: ICreateCategory): Promise<CategoryEntity>;
  update(data: IUpdateCategory): Promise<CategoryEntity>;
  remove(id: string): Promise<void>;
}

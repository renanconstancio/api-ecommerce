// import { ICategory } from '../models/ICategory';
import { Category } from '@prisma/client';
import { ICreateCategory } from '../models/ICreateCategory';
import { IPaginateCategory } from '../models/IPaginateCategory';
import { ISearchCategory } from '../models/ISearchCategory';
import { IUpdateCategory } from '../models/IUpdateCategory';

export interface ICategoriesRepository {
  findAll({
    page,
    skip,
    take,
    name,
  }: ISearchCategory): Promise<IPaginateCategory>;
  findByName(name: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
  create(data: ICreateCategory): Promise<Category>;
  update(data: IUpdateCategory): Promise<Category>;
  remove(id: string): Promise<void>;
}

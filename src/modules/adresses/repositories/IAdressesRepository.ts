import { ICreateAdresses } from '@modules/adresses/dtos/ICreateAdresses';
import { IUpdateAdresses } from '@modules/adresses/dtos/IUpdateAdresses';
import { IDeleteAdresses } from '@modules/adresses/dtos/IDeleteAdresses';
import { IFindAdressess } from '../dtos/IFindAdressess';
import { IFindForSalesAdresses } from '@modules/adresses/dtos/IFindForSalesAdresses';
import { IPaginateAdresses } from '@modules/adresses/dtos/IPaginateAdresses';
import { Adresses } from '@modules/adresses/infra/prisma/entities/Adresses';

export type AdressesParams = {
  page: number;
  skip: number;
  take: number;
  customers_id: string;
};

export interface IAdressesRepository {
  findAll({
    page,
    skip,
    take,
    customers_id,
  }: AdressesParams): Promise<IPaginateAdresses>;
  findById(data: IFindAdressess): Promise<Adresses | null>;
  findByForSales(data: IFindForSalesAdresses): Promise<Adresses | null>;

  create(data: ICreateAdresses): Promise<Adresses>;
  update(data: IUpdateAdresses): Promise<Adresses>;
  remove(data: IDeleteAdresses): Promise<void>;
}

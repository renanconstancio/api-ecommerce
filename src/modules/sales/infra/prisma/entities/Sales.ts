import { Sales } from '@prisma/client';
import { SalesAddressesEntity } from './SalesAddresses';
import { SalesProductsEntity } from './SalesProducts';
import { SalesTransactionsEntity } from './SalesTransactions';

export type SalesEntity = {
  id: string;
  code: string;
  date_of_sale: Date;
  customers_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  addresses: SalesAddressesEntity;
  products: SalesProductsEntity[];
  transactions: SalesTransactionsEntity[];
} & Sales;

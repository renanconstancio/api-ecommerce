import { SalesAddressesEntity } from '@modules/sales/infra/prisma/entities/SalesAddresses';
import { SalesProductsEntity } from '@modules/sales/infra/prisma/entities/SalesProducts';
import { SalesTransactionsEntity } from '@modules/sales/infra/prisma/entities/SalesTransactions';

export interface ISales {
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
}

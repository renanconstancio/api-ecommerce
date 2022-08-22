import { Sales as SalesEntity } from '@prisma/client';
import { SalesAddresses } from './SalesAddresses';
import { SalesProducts } from './SalesProducts';
import { SalesTransactions } from './SalesTransactions';

export type Sales = {
  addresses: SalesAddresses;
  products: SalesProducts[];
  transactions: SalesTransactions[];
} & SalesEntity;

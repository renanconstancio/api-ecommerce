import { SalesTransactions as SalesTransactionsEntity } from '@prisma/client';

export type SalesTransactions = {
  id: string;
  sales_id: string;
  flag: string;
  payment_methods: string;
  installment: number;
  discounts: number;
  discount_type: 'price' | 'percent';
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
} & SalesTransactionsEntity;

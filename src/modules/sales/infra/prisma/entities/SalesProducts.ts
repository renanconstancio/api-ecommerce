import { SalesProducts as SalesProductsEntity } from '@prisma/client';

export type SalesProducts = {
  id: string;
  sales_id: string;
  produtcts_skus_id: string;
  quantity: number;
  price_paid: number;
} & SalesProductsEntity;

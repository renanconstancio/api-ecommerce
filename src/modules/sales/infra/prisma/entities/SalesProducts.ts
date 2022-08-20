import { SalesProducts } from '@prisma/client';

export type SalesProductsEntity = {
  id: string;
  sales_id: string;
  produtcts_skus_id: string;
  quantity: number;
  price_paid: number;
} & SalesProducts;

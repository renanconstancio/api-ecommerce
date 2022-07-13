import { IProductSku } from './IProductSku';

export interface IProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  skus?: IProductSku[];
  created_at: Date;
  updated_at: Date;
}

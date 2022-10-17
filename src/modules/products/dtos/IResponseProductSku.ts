import { IResponseProductImage } from './IUpdateProductImage copy';

export type IResponseProductSku = {
  id: string;
  product_id: string;
  sku: string;
  price: number;
  sale_price: number;
  cost_price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  images?: IResponseProductImage[];
};

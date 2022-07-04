// import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IProduct {
  id: string;
  sku: string;
  // order_products?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProductSku {
  id: string;
  product_id: string;
  sku: string;
  cost_price: number;
  sale_price: number;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

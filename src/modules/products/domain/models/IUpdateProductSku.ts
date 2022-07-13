export interface IUpdateProductSku {
  id: string;
  product_id?: string;
  sku: string;
  sale_price: number;
  cost_price: number;
  price: number;
  quantity: number;
}

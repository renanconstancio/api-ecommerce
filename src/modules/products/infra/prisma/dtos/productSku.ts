export type ProductSku = {
  id?: string;
  product_id?: string;
  sku: string;
  price: number;
  quantity: number;
  cost_price: number;
  sale_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  images?: {
    id: string;
    image_lg: string;
    image_md: string;
    image_xs: string;
  }[];
};

import { ProductSku } from './productSku';

export type ProductDTOs = {
  id?: string;
  name: string;
  keywords: string;
  visible: boolean;
  description: string;
  description_text?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string | null;
  skus?: ProductSku[];
};

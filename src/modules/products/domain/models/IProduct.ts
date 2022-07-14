import { IProductSku } from './IProductSku';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  description_text: string;
  keywords: string;
  visible: string;
  skus?: IProductSku[];
  created_at: Date;
  updated_at: Date;
}

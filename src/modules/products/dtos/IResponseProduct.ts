import { IResponseProductSku } from './IResponseProductSku';

export type IResponseProduct = {
  id: string;
  name: string;
  keywords: string;
  visible: boolean;
  description: string;
  description_text: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  skus?: IResponseProductSku[];
};

import { Products } from '@prisma/client';

export class ProductsEntity implements Products {
  id: string;
  name: string;
  description: string;
  description_text: string;
  keywords: string;
  visible: 'visible' | 'invisible';
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

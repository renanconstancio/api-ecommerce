import { Category } from '@prisma/client';

export type CategoryEntity = {
  id: string;
  category_id: string | null;
  name: string;
  keywords: string | null;
  description: string | null;
  position: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
} & Category;

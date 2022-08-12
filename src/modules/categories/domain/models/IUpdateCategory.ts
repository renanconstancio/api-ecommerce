export interface IUpdateCategory {
  id: string;
  name: string;
  description: string | null;
  keywords: string | null;
  position: number;
  category_id: string | null;
}

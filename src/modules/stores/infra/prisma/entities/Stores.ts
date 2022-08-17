import { Stores } from '@prisma/client';

export type StoresEntity = {
  id: string;
  title: string;
  fantasy_name: string;
  email: string;
  phone: string;
  opening_hours: string;
  address: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
  visible: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
} & Stores;

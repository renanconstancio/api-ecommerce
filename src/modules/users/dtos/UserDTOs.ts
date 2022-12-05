import { typeUser } from '@prisma/client';

export type UserDTOs = {
  id?: string;
  type: typeUser;
  email: string;
  password?: string;
  reset_password?: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string | null;
};

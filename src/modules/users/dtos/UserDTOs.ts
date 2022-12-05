import { TypeUser } from '@prisma/client';

export type UserDTOs = {
  id?: string;
  type: TypeUser;
  email: string;
  password?: string | null;
  reset_password?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string | null;
};

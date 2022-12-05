import { TypeUser } from '@prisma/client';

export type UserAuthDTOs = {
  user: {
    id?: string;
    type: TypeUser;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
  };
  token: string;
};

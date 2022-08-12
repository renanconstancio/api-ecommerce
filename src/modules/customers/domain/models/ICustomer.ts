export interface ICustomer {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string | null;
  cnpj: string | null;
  phone: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  birth_date: string | null;
}

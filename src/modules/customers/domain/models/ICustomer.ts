export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cnpj: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

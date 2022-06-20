export interface ICreateCustomer {
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  cnpj?: string;
  avatar?: string;
  password: string;
}

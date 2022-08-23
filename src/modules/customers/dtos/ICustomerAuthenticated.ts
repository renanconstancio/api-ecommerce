export interface ICustomerAuthenticated {
  customer: {
    id: string;
    email: string;
    name: string;
    cnpj: string | null;
    cpf: string | null;
    phone: string | null;
    birth_date: string | null;
    avatar: string | null;
  };
  token: string;
}

export interface IUpdateAdresses {
  id: string;
  customers_id: string;
  recipient: string;
  address: string;
  number: string;
  district: string;
  complement?: string | null;
  reference?: string | null;
  city: string;
  state: string;
  zip_code: string;
  for_sales: 'yes' | 'no';
}

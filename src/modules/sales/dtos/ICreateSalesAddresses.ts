export interface ICreateSalesAddresses {
  sales_id: string;
  recipient: string;
  address: string;
  number: string;
  district: string;
  complement?: string;
  reference?: string;
  city: string;
  state: string;
  zip_code: string;
}

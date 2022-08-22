import { SalesAddresses as SalesAddressesEntity } from '@prisma/client';

export type SalesAddresses = {
  id: string;
  sales_id: string;
  customers_id: string;
  addresses_id: string;
  recipient: string;
  address: string;
  number: string;
  district: string;
  complement: string | null;
  reference: string | null;
  city: string;
  state: string;
  zip_code: string;
} & SalesAddressesEntity;

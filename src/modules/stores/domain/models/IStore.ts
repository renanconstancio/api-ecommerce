// import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IStore {
  id: string;
  // order_products?: IOrderProducts[];
  title: string;
  fantasy_name: string;
  email: string;
  phone: string;
  opening_hours: string;
  address: string;
  number: string;
  district: string;
  complement: string;
  city: string;
  state: string;
  zip_code: string;
  visible: boolean;
  created_at: Date;
  updated_at: Date;
}

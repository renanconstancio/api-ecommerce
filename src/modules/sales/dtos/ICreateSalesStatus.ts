import { IEnumSalesStatus } from '@modules/sales/dtos/IEnumSalesStatus';
export interface ICreateSalesStatus {
  sales_id: string;
  status: IEnumSalesStatus;
}

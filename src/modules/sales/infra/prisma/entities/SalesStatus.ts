import { IEnumSalesStatus } from '@modules/sales/dtos/IEnumSalesStatus';
import { SalesStatus as SalesStatusEntity } from '@prisma/client';

export type SalesStatus = {
  status: IEnumSalesStatus;
  created_at: Date;
} & SalesStatusEntity;

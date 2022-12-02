export type PaginationDTOs<T> = {
  data: T;
  page: number;
  limit: number;
  total: number;
};

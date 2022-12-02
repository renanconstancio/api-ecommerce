export type PaginationDTOs<T> = {
  data: T,
  limit: number
  page: number
  search: unknown
  order: unknown
};

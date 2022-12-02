export type RequestDTOs = {
  limit: number;
  page: number;
  search: { [x: string]: string | { [x: string]: string } };
  order: { [x: string]: string | { [x: string]: string } };
};

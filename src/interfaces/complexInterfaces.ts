export const SortationOrderTypesEnum = [
  "ascend",
  "descend"
] as const;
export type SortationOrderTypes = typeof SortationOrderTypesEnum[number];

export interface IPagination {
  limit: number,
  page: number
}

export interface IRecords {
  page: number,
  count: number,
  totalCount: number,
  totalPages: number,
  records: any[]
}

export interface ISortation {
  orderBy: string,
  order: SortationOrderTypes
}



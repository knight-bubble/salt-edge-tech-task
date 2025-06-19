import type { PaginationState } from "@tanstack/react-table";

export interface PaginatedData<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  results: T[];
}

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${"asc" | "desc"}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;

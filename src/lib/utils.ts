import type { SortParams } from "@/types/table-pagination";
import type { SortingState } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanEmptyParams = <T extends Record<string, unknown>>(search: T) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (value === undefined || value === "" || (typeof value === "number" && isNaN(value))) delete newSearch[key];
  });

  if (search.pageIndex === 0) delete newSearch.pageIndex;
  if (search.pageSize === 20) delete newSearch.pageSize;
  if (search.sortBy === undefined) delete newSearch.sortBy;

  return newSearch;
};

export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined;

  const sort = sorting[0];

  return `${sort.id}.${sort.desc ? "desc" : "asc"}` as const;
};

export const sortByToState = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return [];

  const [id, desc] = sortBy.split(".");
  return [{ id, desc: desc === "desc" }];
};

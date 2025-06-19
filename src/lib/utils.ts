import type { SortParams } from "@/types/table-pagination";
import type { SortingState } from "@tanstack/react-table";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T,
) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (
      value === undefined ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    )
      delete newSearch[key];
  });

  if (search.pageIndex === 0) delete newSearch.pageIndex;
  if (search.pageSize === 20) delete newSearch.pageSize;
  if (
    search.sortBy === undefined ||
    (Array.isArray(search.sortBy) && search.sortBy.length === 0)
  )
    delete newSearch.sortBy;

  return newSearch;
};

export const stateToSortBy = (
  sorting: SortingState | undefined,
): SortParams["sortBy"] | undefined => {
  if (!sorting || sorting.length === 0) return undefined;

  return sorting.map(
    (sort) => `${sort.id}.${sort.desc ? "desc" : "asc"}` as const,
  );
};

export const sortByToState = (
  sortBy: SortParams["sortBy"] | undefined,
): SortingState => {
  if (!sortBy || sortBy.length === 0) return [];

  return sortBy.map((sort) => {
    const [id, desc] = sort.split(".");
    return { id, desc: desc === "desc" };
  });
};

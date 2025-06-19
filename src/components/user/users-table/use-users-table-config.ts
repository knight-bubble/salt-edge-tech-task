import { useAppConfig } from "@/hooks/use-app-config";
import { useFilters } from "@/hooks/use-filters";
import { sortByToState, stateToSortBy } from "@/lib/utils";
import { Route } from "@/routes/workspace/users";
import type { SortParams } from "@/types/table-pagination";
import type { PaginationState, RowSelectionState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

export const useUsersTableConfig = () => {
  const { config } = useAppConfig();
  const { filters, setFilters } = useFilters(Route.id);
  const sortingState = sortByToState(filters.sortBy as SortParams["sortBy"]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex: filters.pageIndex ?? 0,
      pageSize: filters.pageSize ?? config.pagination.defaultPageSize,
    }),
    [filters.pageIndex, filters.pageSize, config.pagination.defaultPageSize],
  );

  const handlePaginationChange = useCallback(
    (
      updaterOrValue:
        | Parameters<typeof setFilters>[0]
        | ((old: PaginationState) => PaginationState),
    ) => {
      if (typeof updaterOrValue !== "function") return;

      const newPagination = updaterOrValue(pagination);
      setFilters({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
        sortBy: filters.sortBy,
      });
    },
    [pagination, setFilters, filters.sortBy],
  );

  const handleSortingChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updaterOrValue: any) => {
      if (typeof updaterOrValue !== "function") return;

      const newSorting = updaterOrValue(sortingState);
      setFilters({
        pageIndex: filters.pageIndex,
        pageSize: filters.pageSize,
        sortBy: stateToSortBy(newSorting),
      });
    },
    [sortingState, setFilters, filters.pageIndex, filters.pageSize],
  );

  return {
    pagination,
    sortingState,
    rowSelection,
    setRowSelection,
    handlePaginationChange,
    handleSortingChange,
    filters,
  };
};

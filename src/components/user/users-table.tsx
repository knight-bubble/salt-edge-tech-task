import { randomUsersQueryOptions } from "@/api/random-user.api";
import { randomUserColumns } from "@/components/user/users-list-columns";
import { useAppConfig } from "@/hooks/use-app-config";
import { useFilters } from "@/hooks/use-filters";
import { sortByToState, stateToSortBy } from "@/lib/utils";
import { Route } from "@/routes/workspace/users";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import type { SortParams } from "@/types/table-pagination";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Cell,
  type Header,
  type HeaderGroup,
  type PaginationState,
  type Row,
  type RowSelectionState,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Pagination } from "../general/pagination";
import { Spinner } from "../ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export const UsersTable = () => {
  const { config } = useAppConfig();
  const columns = useMemo(() => randomUserColumns, []);
  const { filters, setFilters } = useFilters(Route.id);
  const sortingState = sortByToState(filters.sortBy as SortParams["sortBy"]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const pagination: PaginationState = {
    pageIndex: filters.pageIndex ?? 0,
    pageSize: filters.pageSize ?? config.pagination.defaultPageSize,
  };

  const { pageIndex, pageSize } = pagination;
  const { data: paginatedData, isFetching } = useQuery({
    ...randomUsersQueryOptions(filters.query ?? "", pageIndex, pageSize, sortingState),
    placeholderData: {
      results: [],
      total: 0,
      page: 0,
      pageSize: 0,
      totalPages: 0,
    },
  });

  const table = useReactTable({
    data: paginatedData?.results ?? [],
    columns,
    enableMultiRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      sorting: sortingState,
      rowSelection,
    },
    onPaginationChange: (updaterOrValue) => {
      if (typeof updaterOrValue !== "function") return;

      const newPagination = updaterOrValue(pagination);

      setFilters({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
        sortBy: filters.sortBy,
      });
    },
    onSortingChange: (updaterOrValue) => {
      if (typeof updaterOrValue !== "function") return;

      const newSorting = updaterOrValue(sortingState);
      setFilters({
        pageIndex: filters.pageIndex,
        pageSize: filters.pageSize,
        sortBy: stateToSortBy(newSorting),
      });
    },
    enableMultiSort: true,
    manualSorting: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    rowCount: paginatedData?.total ?? 0,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableRowSelection: true,
    getRowId: (row) => row.login.uuid,
  });

  const navigate = useNavigate({ from: "/workspace/users" });
  const handleDoubleRowClick = useCallback(
    (user: RandomUserRow) => {
      navigate({ to: "/workspace/users/$userId", params: { userId: user.login.uuid ?? "" } });
    },
    [navigate]
  );

  const noData = !isFetching && table.getRowModel().rows.length === 0;

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<RandomUserRow>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<RandomUserRow, unknown>) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isFetching && (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <Spinner />
              </TableCell>
            </TableRow>
          )}

          {!isFetching &&
            !noData &&
            table.getRowModel().rows.map((row: Row<RandomUserRow>) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={(e) => e.detail === 2 && handleDoubleRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell: Cell<RandomUserRow, unknown>) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}

          {noData && (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                <p>No data</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination table={table} />
    </>
  );
};

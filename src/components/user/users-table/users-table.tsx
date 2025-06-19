import { randomUsersQueryOptions } from "@/api/random-user.api";
import { randomUserColumns } from "@/components/user/users-table/users-list-columns";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { Pagination } from "../../general/pagination";
import { Table } from "../../ui/table/table";
import { useUsersTableConfig } from "./use-users-table-config";
import { UsersTableBody } from "./users-table-body";
import { UsersTableHeader } from "./users-table-header";

export const UsersTable = () => {
  const columns = useMemo(() => randomUserColumns, []);
  const navigate = useNavigate({ from: "/workspace/users" });

  const {
    pagination,
    sortingState,
    rowSelection,
    setRowSelection,
    handlePaginationChange,
    handleSortingChange,
    filters,
  } = useUsersTableConfig();

  const { pageIndex, pageSize } = pagination;
  const { data: paginatedData, isFetching } = useQuery({
    ...randomUsersQueryOptions(
      filters.query ?? "",
      pageIndex,
      pageSize,
      sortingState,
    ),
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
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
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

  const handleDoubleRowClick = useCallback(
    (user: RandomUserRow) => {
      navigate({
        to: "/workspace/users/$userId",
        params: { userId: user.login.username ?? "" },
      });
    },
    [navigate],
  );

  const hasData = !isFetching && table.getRowModel().rows.length > 0;

  return (
    <>
      <Table>
        <UsersTableHeader table={table} />
        <UsersTableBody
          table={table}
          columns={columns}
          isFetching={isFetching}
          hasData={hasData}
          onDoubleClick={handleDoubleRowClick}
        />
      </Table>
      <Pagination table={table} />
    </>
  );
};

import { randomUserColumns } from "@/components/user/users-table/users-list-columns";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import type { Table as TableType } from "@tanstack/react-table";
import { TableBody } from "../../ui/table/table";
import { DataRows } from "./data-rows";
import { EmptyState } from "./empty-state";
import { LoadingRows } from "./loading-rows";

export const UsersTableBody = ({
  table,
  columns,
  isFetching,
  hasData,
  onDoubleClick,
}: {
  table: TableType<RandomUserRow>;
  columns: typeof randomUserColumns;
  isFetching: boolean;
  hasData: boolean;
  onDoubleClick: (user: RandomUserRow) => void;
}) => (
  <TableBody>
    {isFetching && <LoadingRows table={table} columns={columns} />}
    {!isFetching && hasData && (
      <DataRows table={table} onDoubleClick={onDoubleClick} />
    )}
    {!isFetching && !hasData && <EmptyState columnsLength={columns.length} />}
  </TableBody>
);

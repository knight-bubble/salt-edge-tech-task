import { randomUserColumns } from "@/components/user/users-table/users-list-columns";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import type { Table as TableType } from "@tanstack/react-table";
import { Skeleton } from "../../ui/skeleton";
import { TableCell, TableRow } from "../../ui/table/table";

export const LoadingRows = ({
  table,
  columns,
}: {
  table: TableType<RandomUserRow>;
  columns: typeof randomUserColumns;
}) => (
  <>
    {Array.from({ length: table.getState().pagination.pageSize }).map(
      (_, index) => (
        <TableRow key={`loading-${index}`}>
          {columns.map((_, index) => (
            <TableCell key={`loading-cell-${index}`}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ),
    )}
  </>
);

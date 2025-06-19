import type { RandomUserRow } from "@/types/domain/random-user-row";
import {
  flexRender,
  type Cell,
  type Row,
  type Table as TableType,
} from "@tanstack/react-table";
import { TableCell, TableRow } from "../../ui/table/table";

export const DataRows = ({
  table,
  onDoubleClick,
}: {
  table: TableType<RandomUserRow>;
  onDoubleClick: (user: RandomUserRow) => void;
}) => (
  <>
    {table.getRowModel().rows.map((row: Row<RandomUserRow>) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
          e.detail === 2 && onDoubleClick(row.original)
        }
      >
        {row.getVisibleCells().map((cell: Cell<RandomUserRow, unknown>) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

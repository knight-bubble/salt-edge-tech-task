import type { RandomUserRow } from "@/types/domain/random-user-row";
import {
  flexRender,
  type Header,
  type HeaderGroup,
  type Table as TableType,
} from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../../ui/table/table";

export const UsersTableHeader = ({
  table,
}: {
  table: TableType<RandomUserRow>;
}) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup: HeaderGroup<RandomUserRow>) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header: Header<RandomUserRow, unknown>) => (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);

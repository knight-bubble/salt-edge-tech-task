import { TableCell, TableRow } from "../../ui/table/table";

export const EmptyState = ({ columnsLength }: { columnsLength: number }) => (
  <TableRow>
    <TableCell colSpan={columnsLength} className="h-24 text-center">
      <p className="text-muted-foreground">No users found</p>
    </TableCell>
  </TableRow>
);

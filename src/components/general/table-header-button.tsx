import { type Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";

export const TableHeaderButton = ({ column, label }: { column: Column<any, any>; label: string }) => {
  const isSorted = column.getIsSorted();
  const handleSort = useCallback(() => {
    if (!isSorted) {
      column.toggleSorting(true, true);
    } else if (isSorted === "desc") {
      column.toggleSorting(false, true);
    } else {
      column.clearSorting();
    }
  }, [column, isSorted]);
  return (
    <Button variant='ghost' onClick={handleSort}>
      {label}
      {!isSorted ? <ArrowUpDown /> : isSorted === "asc" ? <ArrowUp /> : <ArrowDown />}
    </Button>
  );
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import type { RandomUserRow } from "@/types/domain/random-user-row";
import { createColumnHelper } from "@tanstack/react-table";
import { TableHeaderButton } from "../../ui/table/table-header-button";

const columnHelper = createColumnHelper<RandomUserRow>();

export const randomUserColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("picture.thumbnail", {
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={row.original.picture.thumbnail}
          alt={row.original.name.first}
        />
        <AvatarFallback>
          {row.original.name.first[0]}
          {row.original.name.last[0]}
        </AvatarFallback>
      </Avatar>
    ),
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => <TableHeaderButton column={column} label="Name" />,
    cell: ({ row }) => (
      <div>
        {row.original.name.first} {row.original.name.last}
      </div>
    ),
    enableSorting: true,
    enableMultiSort: true,
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => <TableHeaderButton column={column} label="Email" />,
    cell: ({ row }) => <div>{row.original.email}</div>,
    enableSorting: true,
    enableMultiSort: true,
  }),
];

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: TableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(({ headers, id }) => (
            <TableRow key={id}>
              {headers.map((header) => {
                const alignClass =
                  (header.column.columnDef.meta as any)?.align === "right"
                    ? "text-right"
                    : (header.column.columnDef.meta as any)?.align === "center"
                    ? "text-center"
                    : "text-left";

                return (
                  <TableHead key={header.id} className={alignClass}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const alignClass =
                    (cell.column.columnDef.meta as any)?.align === "right"
                      ? "text-right"
                      : (cell.column.columnDef.meta as any)?.align === "center"
                      ? "text-center"
                      : "text-left";

                  return (
                    <TableCell key={cell.id} className={alignClass}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

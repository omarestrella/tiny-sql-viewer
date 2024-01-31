import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"

import { type Column as DBColumn, type Table as DBTable } from "../stores/database"

type TableViewerProps = {
  databaseTable: DBTable | null
}

const columnHelper = createColumnHelper<DBColumn>()

export function TableViewer({ databaseTable }: TableViewerProps) {
  const tableColumns = databaseTable?.columns ?? []

  const columns = tableColumns.map((column) => {
    return columnHelper.accessor((row) => row.name, {
      id: column.name
    })
  })

  const table = useReactTable({ columns, data: [], getCoreRowModel: getCoreRowModel() })
  if (!databaseTable) {
    return null
  }

  return (
    <div className="size-full">
      <div className="w-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="min-w-full border-b">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className="whitespace-nowrap px-2 py-1 text-left text-xs font-semibold text-gray-900"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
        </table>
      </div>
    </div>
  )
}

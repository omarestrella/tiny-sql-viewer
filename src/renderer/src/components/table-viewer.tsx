import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"

import { type Table as DBTable } from "../stores/database"

type TableViewerProps = {
  databaseTable: DBTable | null
  data: Record<string, unknown>[]
}

const columnHelper = createColumnHelper<Record<string, unknown>>()

export function TableViewer({ databaseTable, data }: TableViewerProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: data?.length ?? 0,
    estimateSize: () => 30,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })

  const tableColumns = databaseTable?.columns ?? []

  const columns = tableColumns.map((column) => {
    return columnHelper.accessor((row) => row[column.name], {
      id: column.name
    })
  })

  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() })
  const { rows } = table.getRowModel()

  if (!databaseTable) {
    return null
  }

  return (
    <div className="size-full overflow-hidden">
      <div className="h-full w-auto overflow-auto" ref={tableContainerRef}>
        <table className="grid">
          <thead className="sticky top-0 z-10 grid border-b bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id} className="flex w-full">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className="flex w-full whitespace-nowrap px-4 py-2 text-left text-xs font-semibold text-gray-900"
                        style={{
                          width: header.getSize()
                        }}
                      >
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      </th>
                    )
                  })}
                </tr>
              )
            })}
          </thead>
          <tbody
            className="relative grid"
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const row = rows[virtualItem.index]
              return (
                <tr
                  data-index={virtualItem.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  className="absolute flex w-full border-b"
                  style={{
                    transform: `translateY(${virtualItem.start}px)`
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="flex px-4 py-2"
                      style={{ width: cell.column.getSize() }}
                    >
                      <div className="w-full break-words text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

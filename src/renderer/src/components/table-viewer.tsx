import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

import { AgGridReact, AgGridReactProps } from "ag-grid-react"
import { useRef } from "react"
import useResizeObserver from "use-resize-observer"

import { type Table as DBTable } from "../stores/database"

type ColDef = NonNullable<AgGridReactProps["columnDefs"]>[number]

type TableViewerProps = {
  databaseTable: DBTable | null
  data: Record<string, unknown>[]
}

export function TableViewer({ databaseTable, data }: TableViewerProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const { height } = useResizeObserver({ ref: tableContainerRef })

  // Column Definitions: Defines the columns to be displayed.
  const colDefs: ColDef[] =
    databaseTable?.columns.map((column) => ({
      field: column.name,
      sortable: false
    })) ?? []

  if (!databaseTable) {
    return null
  }

  return (
    <div className="size-full overflow-hidden">
      <div className="h-full w-auto overflow-auto" ref={tableContainerRef}>
        <div
          className="ag-theme-alpine"
          data-id="table-viewer"
          style={{
            height: `${height}px`
          }}
        >
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            autoSizeStrategy={{
              type: "fitGridWidth",
              defaultMinWidth: 100
            }}
          />
        </div>
      </div>
    </div>
  )
}

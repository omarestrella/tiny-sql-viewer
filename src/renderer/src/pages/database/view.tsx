import { useStore } from "@tanstack/react-store"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { SQLView } from "@/components/sql-view"
import { TableViewer } from "@/components/table-viewer"
import { databaseStore } from "@/stores/database"

export function DatabaseView() {
  const store = useStore(databaseStore)
  const params = useParams<{ table: string }>()
  const [search] = useSearchParams()

  const [data, setData] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    if (params.table) {
      databaseStore.selectTable(params.table)
      databaseStore.runSQL(`SELECT * FROM ${params.table}`).then((results) => {
        setData(results as Record<string, unknown>[])
      })
    }
  }, [params])

  return params.table ? (
    <div className="grid size-full">
      {search.get("sql") != null ? (
        <SQLView initialTable={params.table} />
      ) : (
        <TableViewer databaseTable={store.currentTable} data={data} />
      )}
    </div>
  ) : null
}

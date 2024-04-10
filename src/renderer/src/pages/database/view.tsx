import { useStore } from "@tanstack/react-store"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { SQLView } from "@/components/sql-view"
import { TableViewer } from "@/components/table-viewer"
import { databaseStore } from "@/stores/database"

export function DatabaseView() {
  const store = useStore(databaseStore)
  const params = useParams<{ table: string }>()
  const [search] = useSearchParams()

  useEffect(() => {
    if (params.table) {
      databaseStore.selectTable(params.table)
    }
  }, [params])

  return (
    <div className="grid size-full overflow-auto">
      {search.get("sql") != null ? <SQLView /> : <TableViewer databaseTable={store.currentTable} />}
    </div>
  )
}

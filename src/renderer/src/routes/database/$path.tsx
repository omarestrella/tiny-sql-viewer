import { createFileRoute } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"

import { TableViewer } from "@/components/table-viewer"
import { databaseStore } from "@/stores/database"
import { decodeDatabasePath } from "@/utils/path"

export const Route = createFileRoute("/database/$path")({
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps }) => {
    const decodedPath = decodeDatabasePath(params.path)
    const tableName = deps.table

    if (databaseStore.state.path !== decodedPath) {
      await databaseStore.loadDatabase(decodedPath)
    }

    if (tableName) {
      databaseStore.selectTable(tableName)
    }
  },
  validateSearch: (search: Record<string, string>): { table?: string } => {
    return search.table ? { table: search.table } : {}
  },
  component: DatabaseView
})

function DatabaseView() {
  const store = useStore(databaseStore)

  return (
    <div className="grid size-full overflow-auto">
      <TableViewer databaseTable={store.currentTable} />
    </div>
  )
}

import { createFileRoute } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"

import { TableViewer } from "@/components/table-viewer"
import { databaseStore } from "@/stores/database"
import { decodeDatabasePath } from "@/utils/path"

export const Route = createFileRoute("/database/$path")({
  loader: async ({ params }) => {
    const decodedPath = decodeDatabasePath(params.path)
    return databaseStore.loadDatabase(decodedPath)
  },
  component: DatabaseView
})

function DatabaseView() {
  const store = useStore(databaseStore)

  return (
    <div className="size-full overflow-auto">
      <TableViewer databaseTable={store.currentTable} />
    </div>
  )
}

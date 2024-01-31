import { useStore } from "@tanstack/react-store"
import { useState } from "react"

import { TableViewer } from "./components/TableViewer"
import { databaseStore } from "./stores/database"
import { cn } from "./utils/styles"

export function MainView() {
  const store = useStore(databaseStore)

  const [selectingDatabase, setSelectingDatabase] = useState(false)

  return store.path ? (
    <div className="size-full overflow-auto">
      <TableViewer databaseTable={store.currentTable} />
    </div>
  ) : (
    <div
      className={cn(
        "flex size-full items-center justify-center",
        selectingDatabase ? "opacity-20 pointer-events-none" : null
      )}
      onDragOver={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
      onDrop={async (event) => {
        event.preventDefault()

        const file = event.dataTransfer.files[0]
        if (!file) {
          return
        }

        databaseStore.loadDatabase(file.path)
      }}
    >
      <button
        className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-600"
        onClick={async () => {
          setSelectingDatabase(true)
          const path = await window.api.files.openFileDialog()
          if (path) {
            databaseStore.loadDatabase(path)
          }
          setSelectingDatabase(false)
        }}
      >
        Drop a SQLite database, or click to select a file
      </button>
    </div>
  )
}

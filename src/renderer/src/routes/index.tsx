import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { databaseStore } from "@/stores/database"
import { encodeDatabasePath } from "@/utils/path"
import { cn } from "@/utils/styles"

function Index() {
  const navigate = useNavigate({ from: "/" })

  const [selectingDatabase, setSelectingDatabase] = useState(false)

  return (
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
            const encodedPath = encodeDatabasePath(path)
            navigate({
              to: "/database/$path",
              params: {
                path: encodedPath
              }
            })
          }
          setSelectingDatabase(false)
        }}
      >
        Drop a SQLite database, or click to select a file
      </button>
    </div>
  )
}

export const Route = createFileRoute("/")({
  component: Index
})

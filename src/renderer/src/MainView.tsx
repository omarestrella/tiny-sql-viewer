import { databaseStore } from "./stores/database"

export function MainView() {
  return (
    <div
      className="flex size-full items-center justify-center"
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
          const path = await window.api.files.openFileDialog()
          if (path) {
            databaseStore.loadDatabase(path)
          }
        }}
      >
        Drop a SQLite database, or click to select a file
      </button>
    </div>
  )
}

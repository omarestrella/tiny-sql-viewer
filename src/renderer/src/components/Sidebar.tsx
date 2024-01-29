import { databaseStore } from "@renderer/stores/database"
import { useStore } from "@tanstack/react-store"

export function Sidebar() {
  const store = useStore(databaseStore.store)

  return (
    <div className="size-full bg-gray-200 pt-8">
      {store.tables.map((table) => {
        return <div key={table.name}>{table.name}</div>
      })}
    </div>
  )
}

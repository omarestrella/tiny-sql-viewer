import { useStore } from "@tanstack/react-store"

import { databaseStore } from "@/stores/database"

export function Sidebar() {
  const store = useStore(databaseStore)

  return (
    <div className="size-full bg-gray-200 pt-8">
      <div className="size-full p-2">
        {store.tables.map((table) => {
          return (
            <div key={table.name} onClick={() => databaseStore.selectTable(table)}>
              {table.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Link } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"

import { databaseStore } from "@/stores/database"
import { encodeDatabasePath } from "@/utils/path"

export function Sidebar() {
  const store = useStore(databaseStore)

  if (!store.path) {
    return null
  }

  return (
    <div className="size-full bg-gray-200 pt-8">
      <div className="size-full p-2">
        {store.tables.map((table) => {
          return (
            <div key={table.name}>
              <Link
                to="/database/$path"
                params={{ path: encodeDatabasePath(store.path!) ?? "/" }}
                search={{ table: table.name }}
              >
                {table.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

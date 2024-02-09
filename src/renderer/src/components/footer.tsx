import { Link } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"

import { databaseStore } from "@/stores/database"
import { encodeDatabasePath } from "@/utils/path"

export function Footer() {
  const store = useStore(databaseStore)

  return (
    <div className="flex w-full items-center justify-between overflow-hidden border-t px-2">
      <span className="flex-1 truncate font-mono text-[9pt]">{store.path}</span>
      {store.path ? (
        <Link
          to="/database/$path/sql"
          params={{
            path: encodeDatabasePath(store.path)
          }}
          className="px-2 font-mono text-[9pt] font-bold hover:text-sky-500"
        >
          SQL
        </Link>
      ) : null}
    </div>
  )
}

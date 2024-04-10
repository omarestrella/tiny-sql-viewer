import { useStore } from "@tanstack/react-store"
import { Link } from "react-router-dom"

import { databaseStore } from "@/stores/database"
import { encodeDatabasePath } from "@/utils/path"

export function Footer() {
  const store = useStore(databaseStore)

  const encodedPath = store.path ? encodeDatabasePath(store.path) : null

  return (
    <div className="flex w-full items-center justify-between overflow-hidden border-t px-2">
      <span className="flex-1 truncate font-mono text-[9pt]">{store.path}</span>
      {encodedPath ? (
        <Link to="?sql" className="px-2 font-mono text-[9pt] font-bold hover:text-sky-500">
          SQL
        </Link>
      ) : null}
    </div>
  )
}

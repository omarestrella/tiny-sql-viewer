import { useStore } from "@tanstack/react-store"
import { LucidePanelLeft } from "lucide-react"
import { NavLink } from "react-router-dom"

import { databaseStore } from "@/stores/database"
import { encodeDatabasePath } from "@/utils/path"

export function Sidebar() {
  const store = useStore(databaseStore)

  if (!store.path) {
    return null
  }

  return (
    <div className="flex size-full flex-col border-r bg-gray-100">
      <div className="flex h-10 w-full items-center justify-end pr-2">
        <button className="hover:text-sky-500">
          <LucidePanelLeft size={16} />
        </button>
      </div>
      <div className="size-full px-2">
        {store.tables.map((table) => {
          const dbPath = `/database/${encodeDatabasePath(store.path!)}/table/${table.name}`
          return (
            <div key={table.name} className="font-mono text-sm">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-sky-500" : "text-gray-800"
                }}
                to={dbPath}
              >
                {table.name}
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}

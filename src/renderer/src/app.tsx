import { useStore } from "@tanstack/react-store"
import { Outlet } from "react-router-dom"

import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { Titlebar } from "@/components/titlebar"
import { databaseStore } from "@/stores/database"
import { cn } from "@/utils/styles"

export function App() {
  const store = useStore(databaseStore)

  return (
    <>
      <div
        className={cn(
          "grid size-full overflow-hidden",
          store.path ? "grid-cols-[200px,_1fr]" : "grid-cols-1"
        )}
      >
        {store.path ? (
          <div className="size-full">
            <Sidebar />
          </div>
        ) : null}
        <div className="grid grid-rows-[min-content,_minmax(0,_1fr),_24px]">
          <Titlebar />
          <Outlet />
          {store.path ? <Footer /> : null}
        </div>
      </div>
    </>
  )
}

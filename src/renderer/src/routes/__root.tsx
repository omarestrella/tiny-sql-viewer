import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useStore } from "@tanstack/react-store"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { Titlebar } from "@/components/titlebar"
import { databaseStore } from "@/stores/database"
import { cn } from "@/utils/styles"

export const Route = createRootRoute({
  component: function RootRoute() {
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

        <TanStackRouterDevtools />
      </>
    )
  }
})

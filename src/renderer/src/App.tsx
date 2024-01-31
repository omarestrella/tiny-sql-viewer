import { useStore } from "@tanstack/react-store"

import { Sidebar } from "./components/Sidebar"
import { Titlebar } from "./components/Titlebar"
import { MainView } from "./MainView"
import { databaseStore } from "./stores/database"
import { cn } from "./utils/styles"

function App(): JSX.Element {
  const store = useStore(databaseStore)

  return (
    <div className={cn("grid size-full", store.path ? "grid-cols-[200px,_1fr]" : "grid-cols-1")}>
      {store.path ? (
        <div className="size-full">
          <Sidebar />
        </div>
      ) : null}
      <div className="grid grid-rows-[min-content,_1fr]">
        <Titlebar />
        <MainView />
      </div>
    </div>
  )
}

export default App

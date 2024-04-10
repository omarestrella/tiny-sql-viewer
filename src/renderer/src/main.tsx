import "./assets/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom"

import { App } from "./app"
import { Index } from "./pages"
import { DatabaseView } from "./pages/database/view"
import { databaseStore } from "./stores/database"
import { decodeDatabasePath } from "./utils/path"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Index />,
        index: true
      },
      {
        path: "database/:path",
        element: <Outlet />,
        loader: async ({ params }) => {
          if (!params.path) {
            return null
          }
          const path = decodeDatabasePath(params.path)
          const tables = await databaseStore.loadDatabase(path)
          if (!params.table) {
            return redirect(`/database/${params.path}/table/${tables[0].name}`)
          }
          return null
        },
        children: [
          {
            path: "table/:table",
            element: <DatabaseView />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

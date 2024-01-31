import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import { resolve } from "path"

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@": resolve("src/main"),
        "@preload": resolve("src/preload")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        "@": resolve("src/preload"),
        "@main": resolve("src/main")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@": resolve("src/renderer/src")
      }
    },
    plugins: [
      TanStackRouterVite({
        routesDirectory: "src/renderer/src/routes",
        generatedRouteTree: "src/renderer/src/routeTree.gen.ts"
      }),
      react()
    ]
  }
})

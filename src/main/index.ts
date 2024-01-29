import { electronApp, is, optimizer } from "@electron-toolkit/utils"
import { DatabaseChannel, FilesChannel } from "@preload/events"
import crypto from "crypto"
import { app, BrowserWindow, dialog, ipcMain, shell } from "electron"
import { join } from "path"

import icon from "../../resources/icon.png?asset"
import { getDatabaseAdapter } from "./databases"
import { DatabaseAdapter } from "./databases/adapter"

const activeDatabaseAdapters = new Map<string, DatabaseAdapter>()

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    },
    titleBarStyle: "hiddenInset"
  })

  mainWindow.on("ready-to-show", () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: "deny" }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron")

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle(DatabaseChannel.Connect, async (_, type: string, connectionDetails: unknown) => {
    const adapter = getDatabaseAdapter(type)
    const id = crypto.randomUUID()
    console.log("connecting:", type, connectionDetails)
    await adapter.connect(connectionDetails)
    activeDatabaseAdapters.set(id, adapter)
    return id
  })

  ipcMain.handle(DatabaseChannel.GetTables, async (_, id: string) => {
    const tables = await activeDatabaseAdapters.get(id)?.getTables()
    return tables ?? []
  })

  ipcMain.handle(DatabaseChannel.RunSql, async (_, id: string, sql: string) => {
    const results = await activeDatabaseAdapters.get(id)?.runSql(sql)
    return results ?? []
  })

  ipcMain.handle(FilesChannel.OpenFileDialog, async () => {
    const { filePaths } = await dialog.showOpenDialog({ properties: ["openFile"] })
    return filePaths[0] ?? null
  })
})

app.on("before-quit", async () => {
  for (const adapter of activeDatabaseAdapters.values()) {
    await adapter.close()
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

import { ElectronAPI } from "@electron-toolkit/preload"

import { DatabaseAPI } from "./database"
import { FilesAPI } from "./files"

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      database: DatabaseAPI
      files: FilesAPI
    }
  }
}

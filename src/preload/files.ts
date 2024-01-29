import { ipcRenderer } from "electron"

import { FilesChannel } from "./events"

export const API = {
  async openFileDialog() {
    return ipcRenderer.invoke(FilesChannel.OpenFileDialog)
  }
} satisfies FilesAPI

export interface FilesAPI {
  openFileDialog(): Promise<string | null>
}

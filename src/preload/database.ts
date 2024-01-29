import type { Table } from "@main/databases/adapter"
import { ipcRenderer } from "electron"

import { DatabaseChannel } from "./events"

export const API = {
  async connect(type: string, connectionDetails: unknown) {
    return ipcRenderer.invoke(DatabaseChannel.Connect, type, connectionDetails)
  },
  async getTables(connectionID: string) {
    return ipcRenderer.invoke(DatabaseChannel.GetTables, connectionID)
  },
  async runSql(connectionID: string, sql: string) {
    return ipcRenderer.invoke(DatabaseChannel.RunSql, connectionID, sql)
  }
} satisfies DatabaseAPI

export interface DatabaseAPI {
  connect(type: string, connectionDetails: unknown): Promise<string>
  getTables(connectionID: string): Promise<Table[]>
  runSql(connectionID: string, sql: string): Promise<unknown>
}

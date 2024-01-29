import { Store } from "@tanstack/store"

type Column = {
  name: string
  type: string
}

type Table = {
  name: string
  columns: Column[]
}

type Data = {
  path: string | null
  tables: Table[]
}

class DatabaseStore {
  store = new Store<Data>({
    path: null,
    tables: []
  })

  currentDatabaseID: string | null = null

  async loadDatabase(path: string) {
    this.currentDatabaseID = await window.api.database.connect("sqlite", path)
    const tables = await window.api.database.getTables(this.currentDatabaseID)
    console.log(tables)
    this.store.setState((current) => {
      return {
        ...current,
        path,
        tables
      }
    })
  }
}

export const databaseStore = new DatabaseStore()

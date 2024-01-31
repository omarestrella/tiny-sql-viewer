import { Store } from "@tanstack/store"

export type Column = {
  name: string
  type: string
}

export type Table = {
  name: string
  columns: Column[]
}

type Data = {
  path: string | null
  tables: Table[]
  currentTable: Table | null
}

class DatabaseStore extends Store<Data> {
  currentDatabaseID: string | null = null

  constructor() {
    super({
      path: null,
      tables: [],
      currentTable: null
    })
  }

  async loadDatabase(path: string) {
    this.currentDatabaseID = await window.api.database.connect("sqlite", path)
    const tables = await window.api.database.getTables(this.currentDatabaseID)
    console.log(tables)
    this.setState((current) => {
      return {
        ...current,
        path,
        tables,
        currentTable: tables[0] ?? null
      }
    })
  }

  selectTable(table: Table) {
    this.setState((current) => ({ ...current, currentTable: table }))
  }
}

export const databaseStore = new DatabaseStore()

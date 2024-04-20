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
    console.groupCollapsed("DatabaseStore.loadDatabase")
    console.debug(tables)
    console.groupEnd()
    this.setState((current) => {
      return {
        ...current,
        path,
        tables,
        currentTable: tables[0] || null
      }
    })
    return tables
  }

  selectTable(tableName: string) {
    if (this.state.currentTable?.name === tableName) {
      return
    }

    const table = this.tables.find((t) => t.name === tableName)

    if (table) {
      this.setState((current) => ({ ...current, currentTable: table }))
    }
  }

  get tables() {
    return this.state.tables
  }

  async runSQL(sql: string) {
    if (!this.currentDatabaseID) {
      return []
    }
    return await window.api.database.runSQL(this.currentDatabaseID, sql)
  }
}

export const databaseStore = new DatabaseStore()

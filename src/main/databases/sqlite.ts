import Database from "better-sqlite3"

import { DatabaseAdapter, Table } from "./adapter"

export class SQLiteAdapter extends DatabaseAdapter {
  #database: Database.Database | undefined

  async connect(path: string): Promise<void> {
    this.#database = new Database(path)
  }

  async close(): Promise<void> {
    this.#database?.close()
  }

  async getTables(): Promise<Table[]> {
    if (!this.#database) {
      return []
    }

    const tables = this.#database
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all() as { name: string }[]

    return tables.map(({ name }) => {
      const columns = this.#database!.prepare(
        `
        SELECT name, type, "notnull" AS is_nullable, dflt_value AS default_value FROM pragma_table_xinfo(?);
      `
      ).all(name)

      return {
        name,
        columns: columns
      }
    })
  }

  runSql(_sql: string): Promise<unknown> {
    throw new Error("Method not implemented.")
  }
}
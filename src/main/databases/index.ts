import { DatabaseAdapter } from "./adapter"
import { SQLiteAdapter } from "./sqlite"

export function getDatabaseAdapter(type: string): DatabaseAdapter {
  switch (type) {
    case "sqlite":
      return new SQLiteAdapter()
    default:
      throw new Error(`Unknown database type: ${type}`)
  }
}

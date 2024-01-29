export type Column = {
  name: string
  type: string
  is_nullable: "yes" | "no"
  default_value: unknown
}

export type Table = {
  name: string
}

export abstract class DatabaseAdapter {
  abstract connect(connectionDetails: unknown): Promise<void>
  abstract close(): Promise<void>

  abstract getTables(): Promise<Table[]>

  abstract runSql(sql: string): Promise<unknown>
}

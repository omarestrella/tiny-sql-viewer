export function encodeDatabasePath(path: string): string {
  return btoa(path)
}

export function decodeDatabasePath(path: string): string {
  return atob(path)
}

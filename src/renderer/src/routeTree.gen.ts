// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as DatabasePathImport } from './routes/database/$path'
import { Route as DatabasePathSqlImport } from './routes/database/_$path/sql'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DatabasePathRoute = DatabasePathImport.update({
  path: '/database/$path',
  getParentRoute: () => rootRoute,
} as any)

const DatabasePathSqlRoute = DatabasePathSqlImport.update({
  path: '/database/$path/sql',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/database/$path': {
      preLoaderRoute: typeof DatabasePathImport
      parentRoute: typeof rootRoute
    }
    '/database/_$path/sql': {
      preLoaderRoute: typeof DatabasePathSqlImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  DatabasePathRoute,
  DatabasePathSqlRoute,
])

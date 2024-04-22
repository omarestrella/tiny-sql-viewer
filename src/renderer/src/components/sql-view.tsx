import { autocompletion, CompletionContext, CompletionResult } from "@codemirror/autocomplete"
import { defaultKeymap } from "@codemirror/commands"
import { sql as SQLLang, SQLite } from "@codemirror/lang-sql"
import { syntaxTree } from "@codemirror/language"
import { Compartment, EditorState } from "@codemirror/state"
import { EditorView, keymap, lineNumbers } from "@codemirror/view"
import { useStore } from "@tanstack/react-store"
import { basicSetup } from "codemirror"
import { useCallback, useEffect, useRef, useState } from "react"
import { ayuLight } from "thememirror"

import { databaseStore, Table } from "@/stores/database"

import { TableViewer } from "./table-viewer"

const theme = new Compartment()
const sql = new Compartment()

const baseTheme = EditorView.theme({
  ".cm-content": {
    fontFamily: "'JetBrains Mono', Menlo, Monaco, Lucida Console, monospace",
    fontSize: "13px"
  }
})

function Toolbar({ editorView }: { editorView: EditorView | null }) {
  const [results, setResults] = useState<Record<string, unknown>[] | null>(null)
  return (
    <div className="grid grid-cols-1 grid-rows-[32px,min-content]">
      <div className="flex w-full">
        <button
          onClick={async () => {
            const sql = editorView?.state?.doc.toString()
            console.log(sql)
            if (sql) {
              const results = await databaseStore.runSQL(sql)
              console.log(results)
              setResults(results as Record<string, unknown>[])
            }
          }}
        >
          Run SQL
        </button>
      </div>
      {results ? (
        <div className="h-96 border-t">
          <TableViewer databaseTable={databaseStore.state.currentTable} data={results} />
        </div>
      ) : null}
    </div>
  )
}

export function SQLView({ initialTable }: { initialTable: string }) {
  const store = useStore(databaseStore)

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const [editorView, setEditorView] = useState<EditorView | null>(null)

  const getSqlConfig = useCallback((tables: Table[]) => {
    const tableCompletionData = tables.map((table) => ({
      label: table.name,
      boost: 99,
      section: "tables"
    }))

    const schemaCompletionData = tables.reduce((columnData, table) => {
      return {
        ...columnData,
        [table.name]: table.columns.map((c) => ({
          label: c.name
        }))
      }
    }, {})

    const sqlConfig = SQLLang({
      dialect: SQLite,
      tables: tableCompletionData,
      schema: schemaCompletionData
    })

    const _extraCompletions = sqlConfig.language.data.of({
      autocomplete: (context: CompletionContext): CompletionResult | null => {
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
        console.log(nodeBefore)
        if (nodeBefore.name === "Script") {
          const script = context.state.sliceDoc(nodeBefore.from, context.pos)
          if (/select\s+/i.test(script.toLowerCase())) {
            console.log("should return something?")
          }
        }

        return null
      }
    })

    return sqlConfig
  }, [])

  useEffect(() => {
    editorView?.dispatch({
      effects: [sql.reconfigure([getSqlConfig(store.tables)])]
    })
  }, [store.tables, editorView, getSqlConfig])

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const startState = EditorState.create({
      doc: `select * from ${initialTable};`,
      extensions: [
        keymap.of(defaultKeymap),
        sql.of([getSqlConfig([])]),
        lineNumbers(),
        autocompletion(),
        theme.of([baseTheme, ayuLight])
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
      extensions: [basicSetup]
    })

    setEditorView(view)

    return () => {
      view.destroy()

      setEditorView(null)
    }
  }, [initialTable, getSqlConfig])

  return (
    <div
      ref={containerRef}
      className="grid size-full grid-cols-[1fr] grid-rows-[1fr,auto] overflow-hidden border-t [&_.cm-editor]:size-full [&_.cm-editor]:outline-none"
    >
      <div ref={editorRef} className="size-full" />
      <div className="border-t">
        <Toolbar editorView={editorView} />
      </div>
    </div>
  )
}

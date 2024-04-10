import { autocompletion, CompletionContext, CompletionResult } from "@codemirror/autocomplete"
import { defaultKeymap } from "@codemirror/commands"
import { sql, SQLite } from "@codemirror/lang-sql"
import { syntaxTree } from "@codemirror/language"
import { EditorState } from "@codemirror/state"
import { EditorView, keymap, lineNumbers } from "@codemirror/view"
import { useStore } from "@tanstack/react-store"
import { basicSetup } from "codemirror"
import { useEffect, useRef } from "react"
import { ayuLight } from "thememirror"

import { databaseStore } from "@/stores/database"

export function SQLView() {
  const store = useStore(databaseStore)

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    const tableCompletionData = store.tables.map((table) => ({
      label: table.name,
      boost: 99,
      section: "tables"
    }))

    const schemaCompletionData = store.tables.reduce((columnData, table) => {
      return {
        ...columnData,
        [table.name]: table.columns.map((c) => ({
          label: c.name
        }))
      }
    }, {})

    const sqlConfig = sql({
      dialect: SQLite,
      tables: tableCompletionData,
      schema: schemaCompletionData
    })
    const extraCompletions = sqlConfig.language.data.of({
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

    const startState = EditorState.create({
      doc: "select * from table_name;",
      extensions: [
        keymap.of(defaultKeymap),
        ayuLight,
        sqlConfig,
        extraCompletions,
        lineNumbers(),
        autocompletion()
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
      extensions: [basicSetup]
    })

    return () => {
      view.destroy()
    }
  }, [store.tables])

  return (
    <div
      ref={containerRef}
      className="size-full [&_.cm-editor]:size-full [&_.cm-editor]:border-t [&_.cm-editor]:outline-none"
    >
      <div ref={editorRef} className="size-full" />
    </div>
  )
}

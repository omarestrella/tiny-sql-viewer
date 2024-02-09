import { defaultKeymap } from "@codemirror/commands"
import { sql, SQLite } from "@codemirror/lang-sql"
import { EditorState } from "@codemirror/state"
import { EditorView, keymap, lineNumbers } from "@codemirror/view"
import { createFileRoute } from "@tanstack/react-router"
import { basicSetup } from "codemirror"
import { useEffect, useRef } from "react"
import { ayuLight } from "thememirror"

function SQL() {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }
    const startState = EditorState.create({
      doc: "select * from table_name;",
      extensions: [
        keymap.of(defaultKeymap),
        ayuLight,
        lineNumbers(),
        sql({
          dialect: SQLite
        })
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
  }, [])

  return (
    <div ref={containerRef} className="size-full [&_.cm-editor]:size-full">
      <div ref={editorRef} className="size-full" />
    </div>
  )
}

export const Route = createFileRoute("/database/_$path/sql")({
  component: SQL
})

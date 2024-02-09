import { defaultKeymap } from "@codemirror/commands"
import { sql } from "@codemirror/lang-sql"
import { EditorState } from "@codemirror/state"
import { EditorView, keymap } from "@codemirror/view"
import { createFileRoute } from "@tanstack/react-router"
import { basicSetup } from "codemirror"
import { useEffect, useRef } from "react"

function SQL() {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }
    const startState = EditorState.create({
      doc: "Hello World",
      extensions: [keymap.of(defaultKeymap)]
    })

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
      extensions: [basicSetup, sql()]
    })

    return () => {
      view.destroy()
    }
  }, [])

  return (
    <div ref={containerRef} className="size-full">
      <div ref={editorRef} className="size-full" />
    </div>
  )
}

export const Route = createFileRoute("/database/sql")({
  component: SQL
})

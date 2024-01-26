import { Titlebar } from "@renderer/components/Titlebar"

function App(): JSX.Element {
  return (
    <div className="grid grid-cols-[200px,_1fr]">
      <div>hi</div>
      <div>
        <Titlebar />
        <div className="text-3xl">hi</div>
      </div>
    </div>
  )
}

export default App

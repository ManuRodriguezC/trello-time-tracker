import Header from "./components/Header"
import Aside from "./components/Aside"
import Board from "./components/Board"
import { Theme } from "./types"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "./lib/utils"

function App() {

  const board = {
    id: '1',
    title: 'Tablero 1',
    lists: [
      {
        id: '1',
        title: 'Lista 1',
        tasks: [
          { id: '1', title: 'Tarea 1'},
          { id: '2', title: 'Crea una interfas para la app'},
          { id: '3', title: 'Tarea 3'},

        ]
      },
      {
        id: '2',
        title: 'Lista 2',
        tasks: [
          { id: '4', title: 'Tarea 4'},
          { id: '5', title: 'Tarea 5'},
          { id: '6', title: 'Tarea 6'},

        ]
      },
      {
        id: '3',
        title: 'Lista 3',
        tasks: [
          { id: '7', title: 'Tarea 7'},
          { id: '8', title: 'Crea una interfas para la app'},
          { id: '9', title: 'Tarea 9'},

        ]
      },
      {
        id: '4',
        title: 'Lista 4',
        tasks: [
          { id: '10', title: 'Tarea 10'},
          { id: '11', title: 'Tarea 11'},
          { id: '12', title: 'Tarea 12'},

        ]
      }
    ],
    theme: 'velustro' as Theme
  }

  const [asideOpen, setAsideOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      <div id="header" className="w-full bg-inc-500">
        <Header />
      </div>

      <main className="flex h-full w-full grow ">
        <div
          id="aside-content"
          className={`${
            asideOpen
            ? "w-1/4 lg:w-1/4 xl:w-1/5 relative transition-all  duration-500"
            : "w-[2%] bg-foreground transition-all duration-500"}`}
        >
          {asideOpen && <Aside />}
          <div
          className={
            cn(
              "transition-all duration-500",
              asideOpen
              ? `absolute top-8 left-[96%] z-50`
              : `absolute top-20 left-[0.6%] z-50`
            )
            }
            >
            <button
              className={
                asideOpen
                  ? `p-1 bg-foreground text-white rounded-full duration-500
                  hover:transform hover:scale-110 hover:bg-foreground/80 transition-all`
                  : `p-1 bg-background text-foreground rounded-full
                  hover:transform hover:scale-110 transition-all duration-500`}
              onClick={() => setAsideOpen(!asideOpen)}
            >
              {asideOpen 
                ? <ArrowLeft className="transition-all" />
                : <ArrowRight className="transition-all" />
              }
            </button>
          </div>
        </div>

        <div
          id="content"
          className={`${asideOpen ? 'w-3/4 lg:w-3/4 xl:w-4/5' : 'w-full'}`}>
          <Board board={board}/>
        </div>
      </main>
    </div>
  )
}

export default App

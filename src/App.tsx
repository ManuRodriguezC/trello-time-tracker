import { Separator } from "@/components/ui/separator"
import Header from "./components/Header"
import Aside from "./components/Aside"
import Board from "./components/Board"

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
    ]
  }

  return (
    <div className="flex flex-col h-screen">
      <div id="header" className="w-full bg-inc-500">
        <Header />
      </div>

      <main className="flex h-full w-full grow">
        <div className=" w-1/4 lg:w-1/4 xl:w-1/5">
          <Aside />
        </div>

        <Separator orientation="vertical"/>

        <div id="content" className="w-3/4 lg:w-3/4 xl:w-4/5">
          <Board board={board}/>
        </div>
      </main>
    </div>
  )
}

export default App

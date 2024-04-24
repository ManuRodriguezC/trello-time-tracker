import Header from "./components/Header"
import Aside from "./components/Aside"
/*
import Board from "./components/Board"
import { Theme } from "./types"
*/
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "./lib/utils"
import { useUserStore } from "./utils/user"
import SetUserName from "./components/setUserName"
import { Outlet } from "react-router-dom"

function App() {

  const { user } = useUserStore()
  const [asideOpen, setAsideOpen] = useState(false)

  if (!user || user.length === 0) {
    return (
      <SetUserName defaultOpen={true}/>
    )
  }

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
            <Outlet />
            {/*<Board board={board}/>*/}
        </div>
      </main>
    </div>
  )
}

export default App

import { useUserStore } from "@/utils/user"
import { Button } from "./ui/button"
import AddBoard from "./boards/AddBoard"
import { Plus } from "lucide-react"
import { useBoardStore } from "@/utils/board"
import { Link } from "react-router-dom"

export default function Home() {
    const { user } = useUserStore()
    const { boards } = useBoardStore()
    return (
        <section className="h-full w-full p-8 flex flex-col gap-6">
            <h2 className="font-bold text-4xl">Trello de {user}</h2>
            <article className="flex flex-col gap-4">
                <h3 className="font-semibold text-2xl">Tableros</h3>
                <AddBoard>
                    <Button className="w-full p-6">
                        <Plus size={26} />
                        <span className="text-2xl">Nuevo Tablero</span>
                    </Button>
                </AddBoard>
                <div className="flex flex-col justify-center items-center gap-4">
                {boards.map(board => (
                    <Link
                        className="text-slate-500 font-semibold w-64 bg-slate-100 flex justify-center
                        items-center border rounded-lg hover:text-slate-900 text-lg
                        hover:bg-slate-200 hover:border-slate-300"
                        key={board.id} to={`/board/${board.id}`}>
                        {board.title}
                    </Link>
                ))}
                </div>
            </article>
        </section>
    )
}
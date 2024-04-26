import { Board as TypeBoard, Theme, List as TypeList} from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Ellipsis, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useBoardStore } from "@/utils/board";
import { useEffect, useState } from "react";
import { themes } from "./themesOptions/ThemesOptions";
import AddList from "./lists/AddList";
import DropDownMenuOptions from "./DropDownMenuOptions";


export default function Board() {
    const { boards, setBoard: setNewBoard, removeBoard } = useBoardStore()
    const { boardId } = useParams()
    const navigate = useNavigate()

    const [board, setBoard] = useState<TypeBoard>(boards.find(currBoard => currBoard.id == boardId)!)
    
    const [title, setTitle] = useState(board.title)
    const [theme, setTheme] = useState<Theme>(board.theme)
    const [remove, setRemove] = useState<boolean>(false)
    const [lists, setLists] = useState<TypeList[]>(board.lists)

    useEffect(() => {
        const newBoard = {
            ...board,
            title,
            theme
        }

        setBoard(newBoard)
        setNewBoard(newBoard)
    }, [title, theme])

    useEffect(() => {
        if (!remove || !boardId) return
        removeBoard(boardId)
        navigate('/')
    }, [remove])

    useEffect(() => {
        setTheme(board.theme)
        setTitle(board.title)
        setLists(board.lists)
    }, [board])

    useEffect(() => {
        setBoard(boards.find(board => board.id === boardId)!)
    }, [boardId, boards])


    return (
        <section className="w-full h-full bg-cover relative overflow-hidden">
            <div className="w-screen h-full absolute">
                {themes.find(themeOption => themeOption.id === theme)?.component}
            </div>
            
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-9.2rem)]">
                <div
                    id="board-header"
                    className="w-full h-24 flex items-center p-4 bg-slate-800
                    bg-opacity-60 text-primary-foreground justify-between shadow-xl">
                    <h2 className="pl-4 font-semibold text-3xl ">{title}</h2>
                        
                    <DropDownMenuOptions type="board" setTitle={setTitle} setTheme={setTheme} setRemove={setRemove}>
                        <div className="p-1 hover:bg-slate-900 hover:opacity-25 rounded-lg cursor-pointer">
                            <Ellipsis size={24}/>
                        </div>
                    </DropDownMenuOptions>

                </div>

                <Separator />

                <div id="board-content" className="flex items-start gap-4 p-4 overflow-x-scroll h-full">
                    {
                        lists.map(list => (
                            <List key={`list- ${list.id}`} list={list} boardName={board.title}/>
                        ))
                    }
                    <AddList boardId={board.id}>
                        <div
                            key="add-list"
                            className="h-fit p-4 bg-primary rounded-lg text-primary-foreground
                            min-w-52 flex justify-between hover:opacity-80 duration-140 cursor-pointer">
                                <h3 className="font-semibold">Añadir lista</h3>
                                <Plus />
                        </div>
                    </AddList>
                </div>
            </div>

        </section>
    )
}

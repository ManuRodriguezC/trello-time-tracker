import { Board as TypeBoard, Theme} from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Ellipsis, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useParams } from "react-router-dom";
import { useBoardStore } from "@/utils/board";
import { useEffect, useState } from "react";
import SetBoardTheme from "./SetBoardTheme";
import SetBoardTitle from "./SetBoardTitle";
import { themes } from "./ThemesOptions";
import SetBoardremove from "./SetBoardDelete";


export default function Board() {
    const { boards, setBoard: setNewBoard, removeBoard } = useBoardStore()
    const { boardId } = useParams()

    const [board, setBoard] = useState<TypeBoard>(boards.find(currBoard => currBoard.id == boardId)!)

    const [themeMenuOpen, setThemeMenuOpen] = useState(false)
    const [titleMenuOpen, setTitleMenuOpen] = useState(false)
    const [removeMenuOpen, setRemoveMenuOpen] = useState(false)
    
    const [title, setTitle] = useState(board.title)
    const [theme, setTheme] = useState<Theme>(board.theme)
    const [remove, setRemove] = useState<boolean>(false)

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
        if (remove && boardId) {
            removeBoard(boardId)
        }
    }, [remove])

    useEffect(() => {
        setTheme(board.theme)
        setTitle(board.title)
    }, [board])

    useEffect(() => {
        setBoard(boards.find(board => board.id === boardId)!)
    }, [boardId])


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
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="p-1 hover:bg-slate-900 hover:opacity-25 rounded-lg cursor-pointer">
                                    <Ellipsis size={24}/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-xl">
                                    {title}
                                </DropdownMenuLabel>

                                <Separator />

                                <DropdownMenuItem onClick={() => setTitleMenuOpen(true)} className="cursor-pointer">
                                    Cambiar Nombre
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
                                    Cambiar Tema
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setRemoveMenuOpen(true)} className="text-destructive cursor-pointer">
                                    Borrar Tablero
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                </div>

                <Separator />

                <div id="board-content" className="flex gap-4 p-4 overflow-x-scroll h-full">
                    {
                        board.lists.map(list => (
                            <List key={`list- ${list.id}`} list={list} boardName={board.title}/>
                        ))
                    }
                    <div
                        key="add-list"
                        className="h-fit p-4 bg-primary rounded-lg text-primary-foreground
                        min-w-52 flex justify-between hover:opacity-80 duration-140 cursor-pointer">
                        <h3 className="font-semibold">Añadir lista</h3>
                        <Plus />
                    </div>
                </div>
            </div>
            <SetBoardTheme open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={setTheme}/>
            <SetBoardTitle  open={titleMenuOpen} setOpen={setTitleMenuOpen} setTitle={setTitle}/>
            <SetBoardremove open={removeMenuOpen} setOpen={setRemoveMenuOpen} setDelete={setRemove}/>
        </section>
    )
}

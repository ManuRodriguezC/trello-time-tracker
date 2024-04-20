import { Theme, type Board } from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Ellipsis, Plus } from "lucide-react";
import { Lumiflex, Novatrix, Opulento, Tranquiluxe, Velustro } from "uvcanvas"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import ThemeOptions from "./ThemeOptions";


type Props = {
    board: Board;
}

export type ThemeOption = {
    id: Theme,
    component: JSX.Element
}

const themes: ThemeOption[] = [
    { id: 'lumiflex', component: <Lumiflex /> },
    { id: 'novatrix', component: <Novatrix /> },
    { id: 'velustro', component: <Velustro /> },
    { id: 'opulento', component: <Opulento /> },
    { id: 'tranquiluxe', component: <Tranquiluxe /> },
]

export default function Board({ board }: Props) {

    const [themeMenuOpen, setThemeMenuOpen] = useState(false)
    const [themeView, setThemeView] = useState<Theme>(board.theme)

    const renderCurrentTheme = () => {
        const currentTheme = themes.find(item => item.id === themeView);
        return currentTheme ? currentTheme.component : null;
    };

    return (
        <section className="w-full h-full bg-cover relative overflow-hidden">
            <div className="w-screen h-full absolute">
                {renderCurrentTheme()}
            </div>
            
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-9.2rem)]">
                <div
                    id="board-header"
                    className="w-full h-24 flex items-center p-4 bg-slate-800
                    bg-opacity-60 text-primary-foreground justify-between shadow-xl">
                    <h2 className="pl-4 font-semibold text-3xl ">{board.title}</h2>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="p-1 hover:bg-slate-900 hover:opacity-25 rounded-lg cursor-pointer">
                                    <Ellipsis size={24}/>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-lg">
                                    Board
                                </DropdownMenuLabel>

                                <Separator />

                                <DropdownMenuItem className="cursor-pointer">
                                    Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setThemeMenuOpen(true)} className="cursor-pointer">
                                    Change Theme
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive cursor-pointer">
                                    Delete
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
            <ThemeMenu open={themeMenuOpen} setOpen={setThemeMenuOpen} setTheme={setThemeView}/>
        </section>
    )
}



const ThemeMenu = ({ open, setOpen, setTheme }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setTheme: Dispatch<SetStateAction<Theme>>;
}) => {

    const [themeAux, setThemeAux] = useState<Theme>()

    useEffect(() => {
        if (!themeAux) return
        setTheme(themeAux)
        setOpen(false)
    }, [themeAux])

    return (
        <Dialog open={open}>
            <DialogTrigger className="text-sm pl-2"></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Change Theme</DialogTitle>
                <DialogDescription asChild>
                    <div className="flex flex-wrap justify-center">
                        {
                            themes.map(theme => (
                                <ThemeOptions key={theme.id} setTheme={setThemeAux} themeOption={theme} />
                            ))
                        }
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mt-4 px-2 py-1 bg-destructive rounded-md text-primary-foreground hover:opacity-75">
                            Close
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
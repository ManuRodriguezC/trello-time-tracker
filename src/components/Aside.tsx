import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";
import { FolderKanban, Plus, Pencil } from 'lucide-react';
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import SetUserName from "./dialogsBoard/DialogUserName";
import { useUserStore } from "@/utils/user";
import AddBoard from "./boards/AddBoard";
import { useBoardStore } from "@/utils/board";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Aside() {
    const { user } = useUserStore()
    const { boards } = useBoardStore()
    const [iconsSize, setIconsSize] = useState(18)

    const updateIconsSize = () => {
        if (window.innerWidth >= 900) {
            setIconsSize(32)
        } else {
            setIconsSize(18)
        }
    }

    useEffect(() => {
        updateIconsSize();
        window.addEventListener('resize', updateIconsSize);
        return () => window.removeEventListener('resize', updateIconsSize);
      }, []);

    return (
        <aside id="aside" className="w-full bg-muted h-full">
            <div id="name" className="flex-col lg:flex-row flex items-center justify-center h-24 p-4">
                <Avatar>
                    <div
                        className="w-full h-full bg-foreground text-background flex
                        items-center justify-center font-medium text-lg">
                        {user ? user[0] : "N"}
                    </div>
                </Avatar>


                <div className="p-1 lg:p-4 flex flex-col">
                    <BoardWrapper id="name">
                        <h2 className="text-sm pl-2 lg:text-2xl font-bold">{user ? user : "Nombre"}</h2>
                        <BoardOptions>
                            <SetUserName>
                                <Pencil size={iconsSize}/>
                            </SetUserName>
                        </BoardOptions>
                    </BoardWrapper>
                    <span className="pt-2 pl-2 text-xs italic">Gratis</span>
                </div>

            </div>

            <Separator />

            <div id="boards">
                <div id="title" className="p-1 xl:p-2">
                    <BoardWrapper id={`title-select`}>
                        <div className="flex gap-2">
                            <FolderKanban size={iconsSize} />
                            <h2 className="font-medium text-sm xl:text-2xl">Tableros</h2>
                        </div>
                        <BoardOptions>
                            <AddBoard>
                                <Plus size={30} className="hover:bg-slate-300 rounded-full"/>
                            </AddBoard>
                        </BoardOptions>
                    </BoardWrapper>
                </div>

                <div className="w-4/5 pl-[20%]">
                    <Separator />
                </div>

                <div id="boards-containers" className="flex flex-col">
                    {
                        boards.map(board => (
                            <div key={board.id} className="text-sm lg:text-lg hover:bg-slate-300 hover:opacity-60 rounded-sm muted-foreground font-normal">
                                <BoardWrapper id={`board-${board.id}`} className="h-10">
                                    <NavLink className={
                                        ({ isActive }) => isActive
                                        ? "flex items-center px-1 truncate lg:px-4 py-1 lg:py-3 w-full h-full bg-slate-300"
                                        : "flex items-center px-1 truncate lg:px-4 py-1 lg:py-3 w-full h-full"
                                    }
                                    to={`board/${board.id}`}>{board.title}</NavLink>
                                </BoardWrapper>
                            </div>
                        )
                    )}
                </div>
            </div>
        </aside>
    )
}
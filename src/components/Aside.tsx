import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";
import { FolderKanban, Plus, Ellipsis, Pencil } from 'lucide-react';
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import SetUserName from "./dialogsBoard/DialogUserName";
import { useUserStore } from "@/utils/user";
import AddBoard from "./boards/AddBoard";
import { useBoardStore } from "@/utils/board";
import { Link } from "react-router-dom";

export default function Aside() {
    const { user } = useUserStore()
    const { boards } = useBoardStore()

    return (
        <aside id="aside" className="w-full bg-muted h-full">
            <div id="name" className="flex items-center justify-center h-24 p-4">
                <Avatar>
                    <div
                        className="w-full h-full bg-foreground text-background flex
                        items-center justify-center font-medium text-lg">
                        {user ? user[0] : "N"}
                    </div>
                </Avatar>


                <div className="p-4 flex flex-col">
                    <BoardWrapper id="name">
                        <h2 className="text-xl font-bold">{user ? user : "Nombre"}</h2>
                        <BoardOptions>
                            <SetUserName>
                                <Pencil size={22}/>
                            </SetUserName>
                        </BoardOptions>
                    </BoardWrapper>
                    <span className="text-xs italic">Gratis</span>
                </div>

            </div>

            <Separator />

            <div id="boards">
                <div id="title" className="p-2">
                    <BoardWrapper id={`title-select`}>
                        <div className="flex gap-2">
                            <FolderKanban size={32} />
                            <h2 className="font-medium text-2xl">Tableros</h2>
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
                            <div key={board.id} className="px-4 py-1 hover:bg-slate-300 rounded-sm muted-foreground font-normal">
                                <BoardWrapper id={`board-${board.id}`}>
                                    <Link to={`board/${board.id}`}>{board.title}</Link>
                                    <BoardOptions>
                                            <Ellipsis size={18} />
                                    </BoardOptions>
                                </BoardWrapper>
                            </div>
                        )
                    )}
                </div>
            </div>
        </aside>
    )
}
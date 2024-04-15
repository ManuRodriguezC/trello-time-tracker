import { Separator } from "./ui/separator";
import { Avatar } from "./ui/avatar";
import { FolderKanban, Plus, Ellipsis } from 'lucide-react';
import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";

export default function Aside() {
    const name = "Manu Dev"
    const boards = [
        { id: 1, title: 'Tasks'},
        { id: 2, title: 'Earrings'},
        { id: 3, title: 'Projetcs'},
    ]

    return (
        <aside id="aside" className="w-full bg-muted h-full">
            <div id="name" className="flex items-center justify-center h-24 p-4">
                <Avatar>
                    <div
                        className="w-full h-full bg-foreground text-background flex
                        items-center justify-center font-medium text-lg">
                        {name.split(" ")[0][0]}{name.split(" ")[1][0]}
                    </div>
                </Avatar>


                <div className="p-4 flex flex-col">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <span className="text-xs italic">Free</span>
                </div>
            </div>

            <Separator />

            <div id="boards">
                <div id="title" className="p-2">
                    <BoardWrapper id={`title-select`}>
                        <div className="flex gap-2">
                            <FolderKanban />
                            <h2 className="font-medium">Tableros</h2>
                        </div>
                        <BoardOptions>
                            <Plus />
                        </BoardOptions>
                    </BoardWrapper>
                </div>

                <div className="w-4/5 pl-[20%]">
                    <Separator />
                </div>

                <div id="boards-containers" className="flex flex-col">
                    {
                        boards.map(board => (
                            <div key={board.id} className="px-4 py-1 hover:bg-muted-foreground font-normal">
                                <BoardWrapper id={`board-${board.id}`}>
                                    <h3 className="cursor-pointer">{board.title}</h3>
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
import type { Board } from "@/types"
import { Separator } from "./ui/separator";
import List from "./List";
import { Plus } from "lucide-react";
import { Lumiflex } from "uvcanvas"


type Props = {
    board: Board;
}

export default function Board({ board }: Props) {
    return (
        <section className="w-full h-full bg-cover relative">
            <Lumiflex />
            
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-9.2rem)]">
                <div
                    id="board-header"
                    className="w-full h-24 flex items-center p-4">
                    <h2 className="font-semibold text-xl">{board.title}</h2>
                </div>

                <Separator />

                <div id="board-content" className="flex gap-4 p-4 overflow-x-scroll h-full">
                    {
                        board.lists.map(list => (
                            <List key={`list- ${list.id}`} list={list}/>
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
        </section>
    )
}
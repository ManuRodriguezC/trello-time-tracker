import BoardWrapper from "./BoardWrapper";
import BoardOptions from "./BoardOptions";
import { Separator } from "./ui/separator";
import { Plus } from "lucide-react";
import type { List } from "@/types"
import Task from "./Task"

type Props = {
    list: List
}

export default function List({ list }: Props) {
    return (
        <div
            key={list.id}
            className="h-fit p-4 bg-primary rounded-lg text-primary-foreground min-w-52 cursor-pointer shadow-2xl shadow-scale-200">
            <div className="flex flex-col gap-3 items-center">
                <h3 className="font-semibold">{list.title}</h3>
                <Separator />
                <div id={`list-${list.id}-tasks`} className="flex flex-col gap-3 w-full">
                    {
                        list.tasks.map(task => (
                            <Task key={`task-${task.id}`} task={task} />
                        ))
                    }
                </div>

                <div className="w-full mt-2">
                    <BoardWrapper id={`options-list-${list.id}`}>
                        <div className="flex gap-4 justify-between items-center w-full">
                            <h4>Añadir tarea</h4>
                            <BoardOptions className="p-0">
                                <Plus className="w-full h-full hover:text-primary p-1" />
                            </BoardOptions>
                        </div>
                    </BoardWrapper>
                </div>
            </div>
        </div>
    )
}
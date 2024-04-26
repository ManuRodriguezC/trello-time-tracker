import { TaskType } from "@/types"
import BoardWrapper from "./BoardWrapper"
import BoardOptions from "./BoardOptions"
import { Ellipsis } from "lucide-react"

type Props = {
    task: TaskType
}

export default function Task({ task }: Props) {
    return (
        <BoardWrapper id={task.id} className="px-2 py-4 bg-muted rounded-sm text-primary">
            <div key={task.id}>
                {task.title}
            </div>
            <BoardOptions className="p-1 hover:bg-black/10">
                <Ellipsis size={16}/>
            </BoardOptions>
        </BoardWrapper>
    )
}
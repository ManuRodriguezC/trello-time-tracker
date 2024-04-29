import { TaskType } from "@/types"
import BoardWrapper from "./BoardWrapper"
import BoardOptions from "./BoardOptions"
import { Ellipsis } from "lucide-react"
import DropDownMenuOptions from "./DropDownMenuOptions"
import { useEffect, useState } from "react"
import { useBoardStore } from "@/utils/board"

type Props = {
    task: TaskType
}

export default function Task({ task }: Props) {

    const { updateTask, removeTask } = useBoardStore() 
    const [title, setTitle] = useState<string>(task.title)
    const [remove, setRemove] = useState<boolean>(false)

    useEffect(() => {
        updateTask({
            ...task,
            title
        })
    }, [title])

    useEffect(() => {
        if (!remove) return
        removeTask(task.id)
    }, [remove])

    return (
        <BoardWrapper id={task.id} className="px-3 py-6 text-lg bg-muted rounded-sm text-primary">
            <div key={task.id}>
                {task.title}
            </div>
            <BoardOptions className="p-1 hover:bg-black/10 h-6">
                <DropDownMenuOptions
                    type="task"
                    setTitle={setTitle}
                    setRemove={setRemove}
                    >

                    <Ellipsis size={16} className="relative bottom-6"/>
                </DropDownMenuOptions>
            </BoardOptions>
        </BoardWrapper>
    )
}
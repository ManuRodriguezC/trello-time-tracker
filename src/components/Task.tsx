import { TaskType } from "@/types"

type Props = {
    task: TaskType
}

export default function Task({ task }: Props) {
    return (
        <div key={task.id} className="p-2 bg-muted rounded-sm text-primary">
            {task.title}
        </div>
    )
}
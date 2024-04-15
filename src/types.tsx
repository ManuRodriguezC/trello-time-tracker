export type Board = {
    id: string;
    title: string;
    lists: List[];
}

export type List = {
    id: string;
    title: string;
    tasks: TaskType[];
}

export type TaskType = {
    id: string;
    title: string;
}
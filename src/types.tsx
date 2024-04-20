export type Board = {
    id: string;
    title: string;
    lists: List[];
    theme: Theme;
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


export type Theme = 'lumiflex' | 'novatrix' | 'velustro' | 'opulento' | 'tranquiluxe'
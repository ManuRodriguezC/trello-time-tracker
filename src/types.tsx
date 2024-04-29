type Time = {
    time: number;
}

export type Board = Time &{
    id: string;
    title: string;
    lists: List[];
    theme: Theme;
}

export type List = Time & {
    id: string;
    title: string;
    tasks: TaskType[];
}

export type TaskType = Time & {
    id: string;
    title: string;
}


export type Theme = 'lumiflex' | 'novatrix' | 'velustro' | 'opulento' | 'tranquiluxe'
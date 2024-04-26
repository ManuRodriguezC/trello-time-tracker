import { Theme } from "@/types"
import { Lumiflex, Novatrix, Opulento, Tranquiluxe, Velustro } from "uvcanvas"

export type ThemeOption = {
    id: Theme,
    component: JSX.Element
}

export const themes: ThemeOption[] = [
    { id: 'lumiflex', component: <Lumiflex /> },
    { id: 'novatrix', component: <Novatrix /> },
    { id: 'velustro', component: <Velustro /> },
    { id: 'opulento', component: <Opulento /> },
    { id: 'tranquiluxe', component: <Tranquiluxe /> },
]
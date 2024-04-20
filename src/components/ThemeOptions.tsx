import { Theme } from "@/types";
import React, { MouseEvent } from "react"
import { ThemeOption } from "./Board";

type Props = {
    themeOption: ThemeOption
    setTheme: React.Dispatch<React.SetStateAction<Theme | undefined>>;
}

export default function ThemeOptions ({ themeOption, setTheme } : Props) {

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const id = target.id as Theme
        if (id) {
            setTheme(id)
        }
    }
    return (
        <div className="w-48 h-28 cursor-pointer relative">
            {themeOption.component}
            <div
                className="absolute top-0 left-0 w-full h-full hover:opacity-80"
                onClick={handleClick}
                id={themeOption.id}
            ></div>
        </div>
    )
}
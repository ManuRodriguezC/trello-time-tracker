import React from "react"

type Props = {
    id: string
    children: React.ReactNode
}

const handleMouseEnter = (id: string) => {
    const target = document.getElementById(id)

    const options = target?.getElementsByClassName('board-options')
    if (!options) return
    for (const option of options) {
        option.classList.remove('invisible')
    }
}

const handleMouseLeave = (id: string) => {
    const target = document.getElementById(id)

    const options = target?.getElementsByClassName("board-options")
    if (!options) return
    for (const option of options) {
        option.classList.add('invisible')
    }
}

export default function BoardWrapper({ id, children}: Props) {
    return (
        <div
            onMouseEnter={() => handleMouseEnter(id)}
            onMouseLeave={() => handleMouseLeave(id)}
            id={id}
            className="board-wrapper flex justify-between items-center">
            {children}
        </div>
    )

}
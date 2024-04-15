import { cn } from "@/lib/utils"
import React from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export default function BoardOptions({ children, ...rest } : Props) {
    const { className } = rest
    return (
        <div {...rest} className={cn(
            "invisible board-options",
            "cursor-pointer hover:bg-muted p-1 rounded-sm",
            className
            )}>
            {children}
        </div>
    )
}
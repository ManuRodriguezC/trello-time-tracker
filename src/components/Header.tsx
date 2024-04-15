import { SquareKanban } from 'lucide-react';

export default function Header() {
    return (
        <header className="w-full h-12 bg-foreground text-background flex items-center p-4 gap-1 shadow-lg">
            <SquareKanban size={24}/>
            <h1 className="font-medium h-full leading-3 text-2xl">Trello</h1>
        </header>
    )
}

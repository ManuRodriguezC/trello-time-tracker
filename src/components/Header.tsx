import { SquareKanban, AlarmClock } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className="w-full h-16 bg-foreground text-background flex items-center p-4 gap-1 shadow-lg justify-between">
            <NavLink to={'/'}>
                <div className='flex items-center'>
                    <SquareKanban size={24}/>
                    <h1 className="font-medium h-full text-2xl">Trello</h1>
                </div>
            </NavLink>
            <AlarmClock />
        </header>
    )
}

import { List as ListType } from "@/types";
import { Play, Pause, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { useBoardStore } from "@/utils/board";

export default function Timer ({ lists }: {
   lists: ListType[] 
}) {
    const [ counter, setCounter] = useState(0)
    const [display, setDisplay] = useState<string>('00:00')
    const [play, setPlay] = useState(false)
    const [list, setList] = useState<string>()
    const { trackTime } = useBoardStore()

    const handelPlay = () => {
        if (!list) return
        setPlay(!play)
    }

    const handleStop = () => {
        setCounter(0)
        if (!list) return
        trackTime(list, counter)
    }

    const handlePause = () => {
        setPlay(false)
    }

    const handleValueChange = (value: string) => {
        setList(value)
    }

    useEffect(() => {
        if (!play) return
        const interval = setInterval(() => {
            setCounter(prev => prev + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [play])

    useEffect(() => {
        const hour = Math.floor(counter / 3600)
        const restSeconds = counter % 3600
        const minutos = Math.floor(restSeconds / 60)
        const seconds = restSeconds % 60

        const hoursString = hour < 10 ? `0${hour}` : `${hour}`
        const minsString = minutos < 10 ? `0${minutos}` : `${minutos}`
        const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`
        setDisplay(
            hour === 0
            ? `${minsString}:${secondsString}`
            : `${hoursString}:${minsString}:${secondsString}`
        )
    }, [counter])

    return (
        <div className="flex gap-4 items-center">
            <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px] text-foreground">
                    <SelectValue placeholder="Listas"/>
                </SelectTrigger>
                <SelectContent>
                    {lists.map(list => (
                        <SelectItem key={`select-list-${list.id}`} value={list.id}>{list.title}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span>{display}</span>
            {
                play
                ? (<Pause onClick={handlePause} size={24} className="cursor-pointer" />)
                :
                (
                    <>
                        <Play onClick={handelPlay} size={24} className={list ? 'cursor-pointer' : 'cursor-not-allowed'} />
                        { counter > 0 && <Square onClick={handleStop} />}
                    </>
                )
            }
        </div>
    )
}
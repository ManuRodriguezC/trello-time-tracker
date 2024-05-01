import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useBoardStore } from "@/utils/board";

const StartOptions = {
    '25/5': {
      work: 25 * 60,
      rest: 5 * 60,
      longRest: 4,
      worksToLongRest: 4
    },
    '50/10': {
      work: 50 * 60,
      rest: 10 * 60,
      longRest: 30 * 60,
      worksToLongRest: 2
    },
  }

type StartOptionsType = '25/5' | '50/10'
type Mode = 'Trabajo' | 'Descanso'

const formatTime = (time: number, setDisplay: Dispatch<SetStateAction<string>>) => {
    const minutos = Math.floor(time / 60)
    const seconds = time % 60

    const minsString = minutos < 10 ? `0${minutos}` : `${minutos}`
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`
    setDisplay(`${minsString}:${secondsString}`)
}
export default function Start() {

    const { boards, trackTime } = useBoardStore()
    const [option, setOptions] = useState<StartOptionsType>('25/5')
    const [work, setWork] = useState<number>(StartOptions[option].work)
    const [rest, setRest] = useState<number>(StartOptions[option].rest)
    const [display, setDisplay] = useState<string>('00:00')
    const [mode, setMode] = useState<Mode>('Trabajo')
    const [play, setPlay] = useState<boolean>(false)
    const [list, setList] = useState<string>()
    const workTimes = useRef<number>(0)

    const handlePlay = () => {
        if (!list) return
        setPlay(true)
    }

    const handlePause = () => {
        setPlay(false)
    }

    const handleChangeValue = (value: StartOptionsType) => {
        setOptions(value)
    }

    const handleSeletedListChange = (value: string) => {
        setList(value)
    }

    useEffect(() => {
        if (!play) return
        const interval = setInterval(() => {
            if (mode == 'Trabajo') {
                setWork(prev => prev - 1)
            } else {
                setRest(prev => prev - 1)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [play])

    useEffect(() => {
        if (mode !== 'Trabajo' || !list) return
        if (work === 0) {
            setMode('Descanso')
            setPlay(false)
            setWork(StartOptions[option].work)
        }
        if (work !== StartOptions[option].work) {
            trackTime(list, 1)
        }
        formatTime(work, setDisplay)
    }, [work])

    useEffect(() => {
        if (mode !== 'Descanso' || !list) return
        if (rest === 0) {
            workTimes.current += 1
            if (workTimes.current > 0 &&
                (workTimes.current + 1) % StartOptions[option].worksToLongRest === 0
            ) {
                setRest(StartOptions[option].longRest)
            } else {
                setRest(StartOptions[option].rest)
            }
            setMode('Trabajo')
            setPlay(false)
        }
        if (rest !== StartOptions[option].rest) {
            trackTime(list, 1)
        }
        formatTime(rest, setDisplay)
    }, [rest])

    useEffect(() => {
        if (mode === 'Trabajo') {
            formatTime(work, setDisplay)
        } else {
            formatTime(rest, setDisplay)
        }
    }, [mode])

    useEffect(() => {
        workTimes.current = 0
        setWork(StartOptions[option].work)
        setRest(StartOptions[option].rest)
        setMode('Trabajo')
    }, [option])

    return (
        <section className="w-full h-full flex flex-col gap-3 items-center justify-center">
            <span>{mode.toUpperCase()} {`# ${workTimes.current + 1}`}</span>
            <div className="flex gap-2" id="options">
                <Button onClick={() => handleChangeValue('25/5')} variant={'outline'} className="hover:bg-slate-200">25/5</Button>
                <Button onClick={() => handleChangeValue('50/10')} variant={'outline'} className="hover:bg-slate-200">50/10</Button>
            </div>
            <span className="font-semibold text-9xl">{display}</span>
            <div id="action-buttons">
                {!play
                    ? <Button disabled={!list} onClick={handlePlay}>Empezar</Button>
                    : <Button onClick={handlePause}>Detener</Button>
                }
            </div>
            <div id="select-list">
                <Label htmlFor="list-to-time">Selecciona una lista para asignar tiempo</Label>
                <Select onValueChange={handleSeletedListChange}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona una lista" />
                    </SelectTrigger>
                    <SelectContent>
                        {boards.map(board => (
                            <SelectGroup key={`select-group-${board.title}`}>
                                <SelectLabel>{board.title}</SelectLabel>
                                {
                                    board.lists.map(list => (
                                        <SelectItem key={`select-list-${list.title}`} value={list.title}>{list.title}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </section>
    )
}
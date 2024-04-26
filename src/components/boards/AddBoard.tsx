import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Theme } from "@/types"
import { useBoardStore } from "@/utils/board"
import { ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  children?: ReactNode;
  defaultOpen?: boolean;
}
 
export default function AddBoard({ children }: Props) {

    const { addBoard }= useBoardStore()

    const [title, setTitle] = useState('')
    const themes: Theme[] = ['lumiflex', 'novatrix', 'velustro', 'opulento', 'tranquiluxe']
    const navigate = useNavigate()

    const getRandomTheme = (arr: Theme[]): Theme => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const handleAddBoard = () => {
        const newBoard = {
            id: crypto.randomUUID(),
            title: title,
            lists: [],
            theme: getRandomTheme(themes)
        }
        addBoard(newBoard)
        navigate(`board/${newBoard.id}`)
    }

  return (
    <Dialog >
        <DialogTrigger>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Tablero</DialogTitle>
                <DialogDescription>
                    Crea un nuevo tablero. Haga clic en guardar cuando haya terminado.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Nombre
                    </Label>
                    <Input
                    id="name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        onClick={handleAddBoard}
                        type="submit">
                            Guardar Tablero
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button variant={'destructive'}>
                        Cerrar
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
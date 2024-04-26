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
import { useBoardStore } from "@/utils/board"
import { ReactNode, useState } from "react"

type Props = {
  children?: ReactNode;
  listId: string
}
 
export default function AddTask({ children, listId }: Props) {

    const { addTask }= useBoardStore()

    const [title, setTitle] = useState('')

    const handleAddTask = () => {
        console.log(title)
        addTask(listId, {
            id: crypto.randomUUID(),
            title: title
        })
    }

  return (
    <Dialog >
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Crear Tarea</DialogTitle>
                <DialogDescription>
                    Crea un nueva tarea. Haga clic en guardar cuando haya terminado.
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
                        onClick={handleAddTask}
                        type="submit">
                            Guardar Lista
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
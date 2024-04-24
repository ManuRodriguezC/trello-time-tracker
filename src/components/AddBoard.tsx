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
import { ReactNode } from "react"

type Props = {
  children?: ReactNode;
  defaultOpen?: boolean;
}
 
export default function AddBoard({ children }: Props) {

    const { addBoard }= useBoardStore()

    const handleAddBoard = () => {
        addBoard({
            id: crypto.randomUUID(),
            title: 'New Board',
            lists: [],
            theme: 'lumiflex'
        })
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
                    defaultValue="Nueva Tabla"
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
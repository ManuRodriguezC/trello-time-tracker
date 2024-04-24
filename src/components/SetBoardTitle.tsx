import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SetStateAction, useState, Dispatch } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function SetBoardTitle ({ open, setOpen, setTitle }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setTitle: Dispatch<SetStateAction<string>>;
}) {

    const [newTitle, setNewTitle] = useState<string>()

    const handleSaveChange = () => {
        if (!newTitle) return
        setTitle(newTitle)
        setOpen(false)
      }

    return (
        <Dialog open={open}>
            <DialogTrigger className="text-sm pl-2"></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Cambiar Nombre</DialogTitle>
                <DialogDescription asChild>
                    Cambiar Nombre de Tablero
                </DialogDescription>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Nombre
                        </Label>
                        <Input
                        id="name"
                        defaultValue={newTitle}
                        className="col-span-3"
                        onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={handleSaveChange}
                        type="submit">
                            Guardar Cambios
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant={'destructive'}
                            type="button"
                            onClick={() => setOpen(false)}>
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
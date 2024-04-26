import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function SetBoardDelete({ open, setOpen, setDelete }: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setDelete: Dispatch<SetStateAction<boolean>>
}) {


    const handleDelete = () => {
        setDelete(true)
        setOpen(false)
    }
    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Borrar Tablero
                    </DialogTitle>
                    <DialogDescription>
                        Estas seguro que quieres borrar este tablero?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)} >Cancelar</Button>
                    <Button onClick={handleDelete} variant={'destructive'}>Borrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}